import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { RussianUserFactory } from '../../infrastructure/russian-user-factory.infrastructure';
import { RussianParkingOwnerFactory } from '../../infrastructure/russian-parking-owner-factory.infrastructure';
import { MongoDbModule } from '../mongo-db/mongo-db.module';

const UserFactory = {
  provide: 'UserFactory',
  useClass: RussianUserFactory,
};
const ParkingOwnerFactory = {
  provide: 'ParkingOwnerFactory',
  useClass: RussianParkingOwnerFactory,
};

@Module({
  imports: [MongoDbModule],
  controllers: [ParkingController],
  providers: [ParkingService, UserFactory, ParkingOwnerFactory],
})
export class ParkingModule {}
