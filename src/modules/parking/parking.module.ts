import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { MongoModule } from '../mongo';
import { AuthModule } from '../auth';

@Module({
  imports: [MongoModule, AuthModule],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
