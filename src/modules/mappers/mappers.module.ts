import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo';
import { ParkingOwnerMapperService } from './services/parking-owner-mapper.service';
import { RegisteredDriverMapperService } from './services/registered-driver-mapper.service';

const services = [ParkingOwnerMapperService, RegisteredDriverMapperService];

@Module({
  imports: [MongoModule],
  providers: services,
  exports: services,
})
export class MappersModule {}
