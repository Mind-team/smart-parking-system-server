import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(new ConfigService().get('MONGODB_LINK')),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
