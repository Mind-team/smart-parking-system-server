import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
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
  controllers: [UserController],
  providers: [UserService, UserFactory, ParkingOwnerFactory],
})
export class UserModule {}
