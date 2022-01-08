import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  DriverMongoService,
  MongoDriver,
  ParkingMongoService,
  ParkingProcessMongoService,
} from '../mongo';
import {
  ParkingOwnerMapperService,
  RegisteredDriverMapperService,
  ParkingProcessMapperService,
  ParkingMapperService,
} from '../mongo/mappers';
import {
  IParkingData,
  Parking,
  NewParkingConstructor,
  IParking,
} from '../../core/parking';
import {
  IDriver,
  IRegisteredDriver,
  RegisteredDriver,
  UnregisteredDriver,
} from '../../core/driver';
import { IParkingProcess } from '../../core/parking-process';

@Injectable()
export class ParkingService {
  constructor(
    private readonly parkingMongoService: ParkingMongoService,
    private readonly parkingOwnerMapperService: ParkingOwnerMapperService,
    private readonly driverMongoService: DriverMongoService,
    private readonly driverMapperService: RegisteredDriverMapperService,
    private readonly parkingProcessMapperService: ParkingProcessMapperService,
    private readonly parkingProcessMongoService: ParkingProcessMongoService,
    private readonly parkingMapperService: ParkingMapperService,
  ) {}

  async createParking(
    data: Pick<IParkingData, 'ownerId' | 'name' | 'address'> & {
      parkingSpacesCount: number;
    },
  ) {
    const newParkingConfig: NewParkingConstructor = {
      name: data.name,
      address: data.address,
      parkingSpacesCount: data.parkingSpacesCount,
      owner: await this.parkingOwnerMapperService.fromDB(data.ownerId),
    };
    const parkingModel = new Parking(newParkingConfig);
    await this.parkingMongoService.save(parkingModel.data());
  }

  // TODO: Некорректно работает с незарегистрированным тк driverMapperService: RegisteredDriverMapperService
  async registerTransportEntry(data: {
    parkingId: string;
    transportPlate: string;
  }) {
    const [driverModel, driverMongo] = await this.getDriverModel(
      data.transportPlate,
    );
    const parkingModel = await this.parkingMapperService.fromDB(data.parkingId);
    parkingModel.registerCarEntry(driverModel, data.transportPlate);
    const parkingProcess = parkingModel.parkingProcessByDriverId(
      driverModel.data()._id,
    );

    await this.updateDocuments(
      parkingProcess,
      parkingModel,
      driverModel,
      driverMongo,
    );
  }

  // TODO: Некорректно работает с незарегистрированным тк driverMapperService: RegisteredDriverMapperService
  async registerTransportDeparture(data: { transportPlate: string }) {
    const [driverModel, driverMongo] = await this.getDriverModel(
      data.transportPlate,
    );
    const parkingProcessMongo = await this.parkingProcessMongoService.findById(
      driverMongo.currentParkingProcessId,
    );
    const parkingModel = await this.parkingMapperService.fromDB(
      parkingProcessMongo.parkingId,
    );
    const parkingProcessModel = parkingModel.parkingProcessByDriverId(
      driverMongo._id,
    );

    if (!parkingProcessModel) {
      throw new InternalServerErrorException(
        `Транспортное средство с номером ${
          data.transportPlate
        } не было зарегистрировано на въезде в паркинг ${
          parkingModel.data()._id
        }`,
      );
    }

    parkingModel.registerCarDeparture(driverModel);

    await this.updateDocuments(
      parkingProcessModel,
      parkingModel,
      driverModel,
      driverMongo,
    );
  }

  async getParkingProcess(parkingProcessId: string) {
    // TODO: check initiator ownership
    const parkingProcess = await this.parkingProcessMapperService.fromDB(
      parkingProcessId,
    );
    if (!parkingProcess) {
      throw new BadRequestException('Неверный номер парковочного процесса');
    }
    return parkingProcess.data();
  }

  private async getDriverModel(
    transportPlate: string,
  ): Promise<[IDriver, MongoDriver]> {
    const driverDocument = await this.driverMongoService.findOne({
      carPlates: { $in: [transportPlate] },
    });
    if (!driverDocument) {
      return [
        new UnregisteredDriver({
          carPlate: transportPlate,
        }),
        driverDocument,
      ];
    }
    return [new RegisteredDriver(driverDocument), driverDocument];
  }

  private async updateDocuments(
    parkingProcess: IParkingProcess,
    parking: IParking,
    driver: IDriver,
    driverMongo: MongoDriver,
  ) {
    const parkingProcessData = parkingProcess.data();
    if (
      await this.parkingProcessMongoService.findById(parkingProcessData._id)
    ) {
      await this.parkingProcessMongoService.updateOne(
        { _id: parkingProcessData._id },
        this.parkingProcessMapperService.toDB(parkingProcess),
      );
    } else {
      await this.parkingProcessMongoService.save(
        this.parkingProcessMapperService.toDB(parkingProcess),
      );
    }
    const parkingData = parking.data();
    await this.parkingMongoService.updateOne(
      { _id: parkingData._id },
      parkingData,
    );
    await this.driverMongoService.updateOne(
      { _id: driver.data()._id },
      await this.driverMapperService.toDB(driver as IRegisteredDriver, {
        refreshToken: driverMongo.refreshToken,
      }),
    );
  }
}
