import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredUserSchema } from '../mongo-db/schemas/registered-user.schema';
import { RussianUserFactory } from '../../infrastructure/russian-user-factory.infrastructure';
import { UnregisteredUserSchema } from '../mongo-db/schemas/unregistered-user.schema';
import { ParkingOwnerSchema } from '../mongo-db/schemas/parking-owner.schema';
import { RussianParkingOwnerFactory } from '../../infrastructure/russian-parking-owner-factory.infrastructure';

const UserFactory = {
  provide: 'UserFactory',
  useClass: RussianUserFactory,
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
