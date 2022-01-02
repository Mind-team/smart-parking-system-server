import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { MongoModule } from '../mongo';

@Module({
  imports: [MongoModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
