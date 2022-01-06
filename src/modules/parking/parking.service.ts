import { Injectable } from '@nestjs/common';
import {
  DriverMongoService,
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
} from '../../core/parking';
import {
  IDriver,
  IRegisteredDriver,
  RegisteredDriver,
  UnregisteredDriver,
} from '../../core/driver';

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

  // TODO: Некорректно работает с незарегистрированным
  async registerTransportEntry(data: {
    parkingId: string;
    transportPlate: string;
  }) {
    const driverMongo = await this.driverMongoService.findOne({
      carPlates: { $in: [data.transportPlate] },
    });
    let driverModel: IDriver;
    if (!driverMongo) {
      driverModel = new UnregisteredDriver({
        carPlate: data.transportPlate,
      });
    } else {
      driverModel = new RegisteredDriver(driverMongo);
    }
    const parkingModel = await this.parkingMapperService.fromDB(data.parkingId);
    parkingModel.registerCarEntry(driverModel);
    const parkingProcess = parkingModel.parkingProcessByDriverId(
      driverModel.data()._id,
    );
    await this.parkingProcessMongoService.save(
      this.parkingProcessMapperService.toDB(parkingProcess),
    );
    await this.parkingMongoService.updateOne(
      { _id: parkingModel.data()._id },
      parkingModel.data(),
    );
    await this.driverMongoService.updateOne(
      { _id: driverModel.data()._id },
      await this.driverMapperService.toDB(driverModel as IRegisteredDriver, {
        refreshToken: driverMongo.refreshToken,
      }),
    );
  }

  private async registerUnregisteredTransportEntry() {
    return null;
  }

  private async registerRegisteredTransportEntry() {
    return null;
  }
}
