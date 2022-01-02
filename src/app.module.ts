import { Module } from '@nestjs/common';
import { DriverModule } from './modules/driver/driver.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoModule } from './modules/mongo';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(new ConfigService().get('MONGODB_LINK')),
    MongoModule,
    DriverModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
