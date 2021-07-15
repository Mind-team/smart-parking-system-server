import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredUserSchema } from '../schemas/registered-user.schema';
import { RussianFactory } from '../infrastructure/russian-factory.infrastructure';
import { UnregisteredUserSchema } from '../schemas/unregistered-user.schema';

const Factory = {
  provide: 'Factory',
  useClass: RussianFactory,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RegisteredUser', schema: RegisteredUserSchema },
      { name: 'UnregisteredUser', schema: UnregisteredUserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, Factory],
})
export class UserModule {}
