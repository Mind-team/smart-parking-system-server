import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  IRegisteredDriverData,
  RegisteredDriver,
  NewRegisteredDriverConstructor,
} from '../../core/driver';
import { DriverMongoService } from '../mongo';
import { JwtWrapperService } from '../auth';
import {
  ParkingProcessMapperService,
  RegisteredDriverMapperService,
} from '../mongo/mappers';
import { SMSConfirmationService } from '../confirmation';

@Injectable()
export class DriverService {
  constructor(
    private readonly registeredDriverMapperService: RegisteredDriverMapperService,
    private readonly driverMongoService: DriverMongoService,
    private readonly parkingProcessMapperService: ParkingProcessMapperService,
    private readonly jwtService: JwtWrapperService,
    private readonly smsConfirmationService: SMSConfirmationService,
  ) {}

  sendConfirmationSMSCode(phone: string) {
    this.smsConfirmationService.sendConfirmationCode(phone);
  }

  /**
   * Регистрация водителя. Проверят пользовался ли уже водитель нашей системой.
   * Если да - переносит всю информацию
   */
  async registerDriver(
    config: Omit<
      IRegisteredDriverData,
      '_id' | 'parkingProcessIds' | 'currentParkingProcessId' | 'type'
    >,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // TODO:
    // реализовать трансфер между незарегистрированным и заренистрированным
    // У незарегистрированных пользователей в carPlates только один элемент
    // Мы должны пройтись по carPlates из config. Каждый знак искать в бд
    // По итогу будет массив обьектов из бд
    const newDriverConfig: NewRegisteredDriverConstructor = {
      carPlates: config.carPlates,
      parkingProcessIds: [],
      // TODO: Hash password
      password: config.password,
      phoneNumber: config.phoneNumber,
    };
    const model = new RegisteredDriver(newDriverConfig);
    const modelData = model.data();
    const tokens = this.jwtService.generateTokens({
      id: modelData._id,
      phone: modelData.phoneNumber,
    });
    try {
      const mongoDriver = await this.registeredDriverMapperService.toDB(model, {
        refreshToken: tokens.refreshToken,
      });
      await this.driverMongoService.save(mongoDriver);
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так --- ' + e.message);
    }
  }

  async loginDriver(phoneNumber: string, confirmationCode: string) {
    if (
      !this.smsConfirmationService.isConfirmationCodeTrue(
        phoneNumber,
        confirmationCode,
      )
    ) {
      throw new BadRequestException('Неверный код');
    }
    const driverMongo = await this.driverMongoService.findOne({ phoneNumber });
    if (!driverMongo) {
      throw new BadRequestException('Вам нужно зарегистрироваться');
    }
    return await this.refreshToken(driverMongo.refreshToken);
  }

  async refreshToken(token: string) {
    const infoFromToken =
      this.jwtService.decodeWithRefreshToken<{ id: string; phone: string }>(
        token,
      );
    if (!infoFromToken.isValid) {
      throw new BadRequestException('Invalid refresh token');
    }
    const driverDocument = await this.driverMongoService.findById(
      infoFromToken.data.id,
    );
    if (!driverDocument || driverDocument.refreshToken !== token) {
      throw new BadRequestException('Invalid refresh token');
    }
    const tokens = this.jwtService.generateTokens({
      id: driverDocument._id,
      phone: driverDocument.phoneNumber,
    });
    driverDocument.refreshToken = tokens.refreshToken;
    await this.driverMongoService.updateOne(
      { _id: driverDocument._id },
      driverDocument,
    );
    return tokens;
  }

  async driverData(data: { id: string }): Promise<IRegisteredDriverData> {
    try {
      const model = await this.registeredDriverMapperService.fromDB(data.id);
      return model.data();
    } catch (e) {
      throw new InternalServerErrorException(
        'Что-то пошло не так --- ' + e.message,
      );
    }
  }

  async parkingProcesses(
    driverId: string,
    settings?: { startIndex: number; endIndex: number },
  ) {
    // TODO: перенести это мб в бизнес модель, учесть маппинг паркинг процессов
    // TODO: чтобы не было кольцевых зависимостей
    // TODO: учитывать settings
    const mongo = await this.driverMongoService.findById(driverId);
    if (!mongo) {
      throw new BadRequestException('Данного водителя не существует');
    }
    return await Promise.all(
      mongo.parkingProcessIds.map(async (id: string) => {
        try {
          return (await this.parkingProcessMapperService.fromDB(id)).data();
        } catch (e) {
          throw e;
        }
      }),
    );
  }
}
