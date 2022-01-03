import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IRegisteredDriverData, RegisteredDriver } from '../../core/driver';
import { DriverMongoService } from '../mongo';
import { NewRegisteredDriverConstructor } from '../../core/driver/registered/new-registered-driver-constructor.type';
import { JwtWrapperService } from '../auth';
import { RegisteredDriverMapperService } from '../mappers/services/registered-driver-mapper.service';

@Injectable()
export class DriverService {
  constructor(
    private readonly registeredDriverMapperService: RegisteredDriverMapperService,
    private readonly driverMongoService: DriverMongoService,
    private readonly jwtService: JwtWrapperService,
  ) {}
  /**
   * Регистрация водителя. Проверят пользовался ли уже водитель нашей системой.
   * Если да - переносит всю информацию
   */
  async registerDriver(
    config: Omit<IRegisteredDriverData, '_id' | 'parkingProcessIds'>,
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
    const modelData = new RegisteredDriver(newDriverConfig).data();
    const tokens = this.jwtService.generateTokens({
      id: modelData._id,
      phone: modelData.phoneNumber,
    });
    try {
      const mongoDriver = await this.registeredDriverMapperService.toDB(
        modelData,
        {
          refreshToken: tokens.refreshToken,
        },
      );
      await this.driverMongoService.save(mongoDriver);
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так');
    }
  }

  async driverData(data: { id: string }): Promise<IRegisteredDriverData> {
    try {
      const mongo = await this.driverMongoService.findById(data.id);
      const model = this.registeredDriverMapperService.fromDB(mongo);
      return model.data();
    } catch (e) {
      throw new InternalServerErrorException('Что-то пошло не так');
    }
  }
}
