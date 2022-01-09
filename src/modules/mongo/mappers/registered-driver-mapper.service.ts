import { Injectable } from '@nestjs/common';
import { RegisteredDriver, IRegisteredDriver } from '../../../core/driver';
import { DriverMongoService } from '../services/driver-mongo.service';
import { MongoDriver } from '../schemas/driver.schema';

@Injectable()
export class RegisteredDriverMapperService {
  constructor(private readonly driverMongoService: DriverMongoService) {}

  async toDB(
    model: IRegisteredDriver,
    additional: { refreshToken: string },
  ): Promise<MongoDriver> {
    return { ...model.data(), refreshToken: additional.refreshToken };
  }

  async fromDB(id: string): Promise<IRegisteredDriver> {
    const mongo = await this.driverMongoService.findById(id);
    return new RegisteredDriver(mongo);
  }
}
