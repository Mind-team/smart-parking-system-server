import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { MongoModule } from '../mongo';
import { AuthModule } from '../auth';
import { MappersModule } from '../mappers';

@Module({
  imports: [MongoModule, AuthModule, MappersModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
