import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { StandardRussianFactory } from '../infrastructure/standard-russian-factory.infrastructure';

const Factory = {
  provide: 'Factory',
  useClass: StandardRussianFactory,
};

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, Factory],
})
export class UserModule {}
