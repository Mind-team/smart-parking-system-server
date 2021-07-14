import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { RussianFactory } from '../infrastructure/russian-factory.infrastructure';

const Factory = {
  provide: 'Factory',
  useClass: RussianFactory,
};

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, Factory],
})
export class UserModule {}
