import { Module } from '@nestjs/common';
import { DriverMongoService } from './services/driver-mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from './schemas/driver.schema';
import { Token } from './enums/token.enum';
import { ParkingMongoService } from './services/parking-mongo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.Driver, schema: DriverSchema }]),
  ],
  providers: [DriverMongoService, ParkingMongoService],
  exports: [DriverMongoService, ParkingMongoService],
})
export class MongoModule {}
