import { Injectable } from '@nestjs/common';
import {
  DriverType,
  IRegisteredDriver,
  IUnregisteredDriver,
  RegisteredDriver,
} from '../../../core/driver';
import { DriverMongoService } from '../services/driver-mongo.service';
import { MongoDriver } from '../schemas/driver.schema';

@Injectable()
export class UnregisteredDriverMapperService {
  constructor(private readonly driverMongoService: DriverMongoService) {}

  async toDB(model: IUnregisteredDriver): Promise<MongoDriver> {
    return {
      ...model.data(),
      refreshToken: null,
      password: null,
      phoneNumber: null,
    };
  }

  async fromDB(id: string): Promise<IRegisteredDriver> {
    const mongo = await this.driverMongoService.findById(id);
    if (!mongo || mongo.type === DriverType.Unregistered) {
      return null;
    }
    return new RegisteredDriver(mongo);
  }
}
