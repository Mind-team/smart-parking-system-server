import { Injectable } from '@nestjs/common';
import {
  DriverType,
  ExistingUnregisteredDriverConstructor,
  IRegisteredDriver,
  IUnregisteredDriver,
  RegisteredDriver,
  UnregisteredDriver,
} from '../../../core/driver';
import { DriverMongoService } from '../services/driver-mongo.service';

@Injectable()
export class DriverMapperService {
  constructor(private readonly driverMongoService: DriverMongoService) {}

  async fromDB(id: string): Promise<IRegisteredDriver | IUnregisteredDriver> {
    const mongo = await this.driverMongoService.findById(id);
    if (!mongo) {
      throw new Error(`Водителя с id ${id} не существует`);
    }
    if (mongo.type === DriverType.Registered) {
      return new RegisteredDriver(mongo);
    }
    const config: ExistingUnregisteredDriverConstructor = {
      _id: mongo._id,
      carPlate: mongo.carPlates[0],
      parkingProcessIds: mongo.parkingProcessIds,
      currentParkingProcessId: mongo.currentParkingProcessId,
    };
    return new UnregisteredDriver(config);
  }
}
