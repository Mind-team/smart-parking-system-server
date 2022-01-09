import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DriverModule } from './modules/driver';
import { MongoModule } from './modules/mongo';
import { ParkingModule } from './modules/parking';
import { AuthModule } from './modules/auth';
import { ParkingOwnerModule } from './modules/parking-owner';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(new ConfigService().get('MONGODB_LINK')),
    MongoModule,
    DriverModule,
    ParkingModule,
    AuthModule,
    ParkingOwnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
