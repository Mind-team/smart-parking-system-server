import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { MongoModule } from '../mongo';

@Module({
  imports: [MongoModule],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
