import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { ParkingModule } from './modules/parking/parking.module';
import { ParkingOwnerModule } from './modules/parking-owner/parking-owner.module';
import { MongoDbModule } from './modules/mongo-db/mongo-db.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(new ConfigService().get('MONGODB_LINK')),
    UserModule,
    ParkingModule,
    ParkingOwnerModule,
    MongoDbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
