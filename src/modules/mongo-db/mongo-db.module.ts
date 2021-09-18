import { Module } from '@nestjs/common';
import { MongoDbService } from './mongo-db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisteredUserSchema } from './schemas/registered-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RegisteredUser', schema: RegisteredUserSchema },
    ]),
  ],
  providers: [MongoDbService],
  exports: [MongoDbService],
})
export class MongoDbModule {}
