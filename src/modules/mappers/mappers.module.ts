import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo';
import { ParkingOwnerMapperService } from './services/parking-owner-mapper.service';
import { RegisteredDriverMapperService } from './services/registered-driver-mapper.service';
import { ParkingMapperService } from './services/parking-mapper.service';
import { ParkingProcessMapperService } from './services/parking-process-mapper.service';
import { UnregisteredDriverMapperService } from './services/unregistered-driver-mapper.service';

const services = [
  ParkingOwnerMapperService,
  RegisteredDriverMapperService,
  ParkingMapperService,
  ParkingProcessMapperService,
  RegisteredDriverMapperService,
  UnregisteredDriverMapperService,
];

@Module({
  imports: [MongoModule],
  providers: services,
  exports: services,
})
export class MappersModule {}
