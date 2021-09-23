import { Module } from '@nestjs/common';
import { ParkingOwnerController } from './parking-owner.controller';
import { ParkingOwnerService } from './parking-owner.service';
import { RussianParkingOwnerFactory } from '../../infrastructure/russian-parking-owner-factory.infrastructure';
import { MongoDbModule } from '../mongo-db/mongo-db.module';

@Module({
  imports: [MongoDbModule],
  controllers: [ParkingOwnerController],
  providers: [
    ParkingOwnerService,
    { provide: 'ParkingOwnerFactory', useClass: RussianParkingOwnerFactory },
  ],
})
export class ParkingOwnerModule {}
