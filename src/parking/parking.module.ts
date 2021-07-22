import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredUserSchema } from '../schemas/registered-user.schema';
import { RussianFactory } from '../infrastructure/russian-factory.infrastructure';
import { UnregisteredUserSchema } from '../schemas/unregistered-user.schema';
import { ParkingOwnerSchema } from '../schemas/parking-owner';
import { RussianParkingOwnerFactory } from '../infrastructure/russian-parking-owner-factory.infrastructure';

const UserFactory = {
  provide: 'UserFactory',
  useClass: RussianFactory,
};
const ParkingOwnerFactory = {
  provide: 'ParkingOwnerFactory',
  useClass: RussianParkingOwnerFactory,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RegisteredUser', schema: RegisteredUserSchema },
      { name: 'UnregisteredUser', schema: UnregisteredUserSchema },
      { name: 'parking-owner', schema: ParkingOwnerSchema },
    ]),
  ],
  controllers: [ParkingController],
  providers: [ParkingService, UserFactory, ParkingOwnerFactory],
})
export class ParkingModule {}
