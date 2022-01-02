import { Module } from '@nestjs/common';
import { DriverMongoService } from './services/driver-mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from './schemas/driver.schema';
import { Token } from './enums/token.enum';
import { ParkingMongoService } from './services/parking-mongo.service';
import { ParkingOwnerMongoService } from './services/parking-owner-mongo.service';
import { ParkingSchema } from './schemas/parking.schema';
import { ParkingOwnerSchema } from './schemas/parking-owner.schema';

const services = [
  DriverMongoService,
  ParkingMongoService,
  ParkingOwnerMongoService,
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Token.Driver, schema: DriverSchema },
      { name: Token.Parking, schema: ParkingSchema },
      { name: Token.ParkingOwner, schema: ParkingOwnerSchema },
    ]),
  ],
  providers: services,
  exports: services,
})
export class MongoModule {}
