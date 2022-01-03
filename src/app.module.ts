import { Module } from '@nestjs/common';
import { DriverModule } from './modules/driver/driver.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoModule } from './modules/mongo';
import { ParkingModule } from './modules/parking/parking.module';
import { MappersModule } from './modules/mappers/mappers.module';
import { AuthModule } from './modules/auth/auth.module';
import { ParkingOwnerModule } from './modules/parking-owner/parking-owner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(new ConfigService().get('MONGODB_LINK')),
    MongoModule,
    DriverModule,
    ParkingModule,
    MappersModule,
    AuthModule,
    ParkingOwnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
