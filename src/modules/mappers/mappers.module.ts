import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo';
import { ParkingOwnerMapperService } from './services/parking-owner-mapper.service';

@Module({
  imports: [MongoModule],
  providers: [ParkingOwnerMapperService],
  exports: [ParkingOwnerMapperService],
})
export class MappersModule {}
