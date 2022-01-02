import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { MongoModule } from '../mongo';
import { MappersModule } from '../mappers';

@Module({
  imports: [MongoModule, MappersModule],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
