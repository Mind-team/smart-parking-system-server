import { Injectable } from '@nestjs/common';
import {
  NewRegisteredDriverConstructor,
  RegisteredDriver,
  ExistingRegisteredDriverConstructor,
  IRegisteredDriver,
} from '../../../core/driver';
import { MongoDriver } from '../../mongo';

@Injectable()
export class RegisteredDriverMapperService {
  async toDB(
    config:
      | NewRegisteredDriverConstructor
      | ExistingRegisteredDriverConstructor,
    additional: { refreshToken: string },
  ): Promise<MongoDriver> {
    const model = new RegisteredDriver(config);
    return { ...model.data(), refreshToken: additional.refreshToken };
  }

  fromDB(driver: MongoDriver): IRegisteredDriver {
    return new RegisteredDriver(driver);
  }
}
