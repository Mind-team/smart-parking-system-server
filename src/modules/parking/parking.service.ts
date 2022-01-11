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
  ParkingMapperService,
  ParkingOwnerMapperService,
  ParkingProcessMapperService,
  RegisteredDriverMapperService,
  UnregisteredDriverMapperService,
} from '../mongo/mappers';
import {
  IParking,
  IParkingData,
  NewParkingConstructor,
  Parking,
} from '../../core/parking';
import {
  DriverType,
  ExistingUnregisteredDriverConstructor,
  IDriver,
  IRegisteredDriver,
  IUnregisteredDriver,
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
    private readonly registeredDriverMapperService: RegisteredDriverMapperService,
    private readonly parkingProcessMapperService: ParkingProcessMapperService,
    private readonly parkingProcessMongoService: ParkingProcessMongoService,
    private readonly parkingMapperService: ParkingMapperService,
    private readonly unregisteredMapperService: UnregisteredDriverMapperService,
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

  async registerTransportDeparture(data: { transportPlate: string }) {
    const [driverModel, driverMongo] = await this.getDriverModel(
      data.transportPlate,
    );
    console.log('prev', driverModel.data());
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

  async getLastDriverParkingProcess(driverId: string) {
    const driverModel = await this.registeredDriverMapperService.fromDB(
      driverId,
    );
    if (!driverModel) {
      throw new BadRequestException('Такого пользователя не существует');
    }
    return (
      await this.parkingProcessMapperService.fromDB(
        driverModel.lastParkingProcessId(),
      )
    ).data(true);
  }

  private async getDriverModel(
    transportPlate: string,
  ): Promise<[IDriver, MongoDriver]> {
    const driverDocument = await this.driverMongoService.findOne({
      carPlates: { $in: [transportPlate] },
    });
    if (!driverDocument) {
      const model = new UnregisteredDriver({
        carPlate: transportPlate,
      });
      await this.driverMongoService.save(
        await this.unregisteredMapperService.toDB(model),
      );
      return [model, driverDocument];
    }
    if (driverDocument.type === DriverType.Registered) {
      return [new RegisteredDriver(driverDocument), driverDocument];
    }
    const existing: ExistingUnregisteredDriverConstructor = {
      _id: driverDocument._id,
      carPlate: driverDocument.carPlates[0],
      parkingProcessIds: driverDocument.parkingProcessIds,
      currentParkingProcessId: driverDocument.currentParkingProcessId,
    };
    return [new UnregisteredDriver(existing), driverDocument];
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
    const updatedDriver =
      driver.type() === DriverType.Registered
        ? await this.registeredDriverMapperService.toDB(
            driver as IRegisteredDriver,
            {
              refreshToken: driverMongo.refreshToken,
            },
          )
        : await this.unregisteredMapperService.toDB(
            driver as IUnregisteredDriver,
          );
    await this.driverMongoService.updateOne(
      { _id: driver.data()._id },
      updatedDriver,
    );
  }
}
