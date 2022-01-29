import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DriverModule } from './modules/driver';
import { MongoModule } from './modules/mongo';
import { ParkingModule } from './modules/parking';
import { AuthModule } from './modules/auth';
import { ParkingOwnerModule } from './modules/parking-owner';
import { ConfirmationModule } from './modules/confirmation/confirmation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(new ConfigService().get('MONGODB_LINK')),
    MongoModule,
    DriverModule,
    ParkingModule,
    AuthModule,
    ParkingOwnerModule,
    ConfirmationModule,
  ],
  controllers: [],
})
export class AppModule {}
