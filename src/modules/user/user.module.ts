import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredUserSchema } from '../mongo-db/schemas/registered-user.schema';
import { RussianUserFactory } from '../../infrastructure/russian-user-factory.infrastructure';
import { UnregisteredUserSchema } from '../mongo-db/schemas/unregistered-user.schema';
import { RussianParkingOwnerFactory } from '../../infrastructure/russian-parking-owner-factory.infrastructure';
import { ParkingOwnerSchema } from '../mongo-db/schemas/parking-owner.schema';
import { MongoDbService } from '../mongo-db/mongo-db.service';
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
  imports: [
    MongooseModule.forFeature([
      { name: 'UnregisteredUser', schema: UnregisteredUserSchema },
      { name: 'parking-owner', schema: ParkingOwnerSchema },
    ]),
    MongoDbModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserFactory, ParkingOwnerFactory],
})
export class UserModule {}
