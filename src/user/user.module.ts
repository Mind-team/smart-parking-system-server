import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredUserSchema } from '../schemas/registered-user.schema';
import { RussianUserFactory } from '../infrastructure/russian-user-factory.infrastructure';
import { UnregisteredUserSchema } from '../schemas/unregistered-user.schema';
import { RussianParkingOwnerFactory } from '../infrastructure/russian-parking-owner-factory.infrastructure';

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
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserFactory, ParkingOwnerFactory],
})
export class UserModule {}
