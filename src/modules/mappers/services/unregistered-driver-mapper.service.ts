import { Injectable } from '@nestjs/common';
import { DriverMongoService } from '../../mongo';

@Injectable()
export class UnregisteredDriverMapperService {
  constructor(private readonly driverMongoService: DriverMongoService) {}
}
