import { Injectable } from '@nestjs/common';
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
    parkingModel.registerCarEntry(driverModel);
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
      driverMongo.currentParkingProcessId,
    );

    parkingModel.registerCarDeparture(driverModel);

    await this.updateDocuments(
      parkingProcessModel,
      parkingModel,
      driverModel,
      driverMongo,
    );
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
    await this.parkingProcessMongoService.save(
      this.parkingProcessMapperService.toDB(parkingProcess),
    );
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
