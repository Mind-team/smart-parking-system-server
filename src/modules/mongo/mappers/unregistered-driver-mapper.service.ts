import { Injectable } from '@nestjs/common';
import { IRegisteredDriver, RegisteredDriver } from '../../../core/driver';
import { DriverMongoService } from '../services/driver-mongo.service';

@Injectable()
export class UnregisteredDriverMapperService {
  constructor(private readonly driverMongoService: DriverMongoService) {}

  // async toDB(model: IRegisteredDriver): Promise<MongoDriver> {
  //   return { ...model.data() };
  // }

  async fromDB(id: string): Promise<IRegisteredDriver> {
    const mongo = await this.driverMongoService.findById(id);
    return new RegisteredDriver(mongo);
  }
}
