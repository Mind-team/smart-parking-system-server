import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ParkingModule } from './parking/parking.module';
import { ParkingOwnerModule } from './parking-owner/parking-owner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(new ConfigService().get('MONGODB_LINK')),
    UserModule,
    ParkingModule,
    ParkingOwnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
