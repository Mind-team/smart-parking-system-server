import { Module } from '@nestjs/common';
import { ParkingOwnerController } from './parking-owner.controller';
import { ParkingOwnerService } from './parking-owner.service';
import { MongoModule } from '../mongo';
import { MappersModule } from '../mappers';
import { AuthModule } from '../auth';

@Module({
  imports: [MongoModule, MappersModule, AuthModule],
  controllers: [ParkingOwnerController],
  providers: [ParkingOwnerService],
})
export class ParkingOwnerModule {}
