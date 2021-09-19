import { Module } from '@nestjs/common';
import { RegisteredUsersMongoService } from './registered-users-mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredUserSchema } from './schemas/registered-user.schema';
import { UnregisteredUserSchema } from './schemas/unregistered-user.schema';
import { UnregisteredUsersMongoService } from './unregistered-users-mongo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RegisteredUser', schema: RegisteredUserSchema },
      { name: 'UnregisteredUser', schema: UnregisteredUserSchema },
    ]),
  ],
  providers: [RegisteredUsersMongoService, UnregisteredUsersMongoService],
  exports: [RegisteredUsersMongoService, UnregisteredUsersMongoService],
})
export class MongoDbModule {}
