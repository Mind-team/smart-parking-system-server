import { Module } from '@nestjs/common';
import { DriverMongoService } from './services/driver-mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from './schemas/driver.schema';
import { Token } from './enums/token.enum';
import { ParkingMongoService } from './services/parking-mongo.service';
import { ParkingOwnerMongoService } from './services/parking-owner-mongo.service';
import { ParkingSchema } from './schemas/parking.schema';
import { ParkingOwnerSchema } from './schemas/parking-owner.schema';
import { ParkingProcessMongoService } from './services/parking-process-mongo.service';
import { ParkingProcessSchema } from './schemas/parking-process.schema';
import {
  ParkingMapperService,
  ParkingOwnerMapperService,
  ParkingProcessMapperService,
  RegisteredDriverMapperService,
  UnregisteredDriverMapperService,
} from './mappers';
import { DriverMapperService } from './mappers/driver-mapper.service';

const services = [
  DriverMongoService,
  ParkingMongoService,
  ParkingOwnerMongoService,
  ParkingProcessMongoService,
  RegisteredDriverMapperService,
  DriverMapperService,
];

const mappers = [
  ParkingOwnerMapperService,
  ParkingMapperService,
  ParkingProcessMapperService,
  UnregisteredDriverMapperService,
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Token.Driver, schema: DriverSchema },
      { name: Token.Parking, schema: ParkingSchema },
      { name: Token.ParkingOwner, schema: ParkingOwnerSchema },
      { name: Token.ParkingProcess, schema: ParkingProcessSchema },
    ]),
  ],
  providers: [...services, ...mappers],
  exports: [...services, ...mappers],
})
export class MongoModule {}
