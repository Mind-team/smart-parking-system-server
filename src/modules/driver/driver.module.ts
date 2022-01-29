import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { MongoModule } from '../mongo';
import { AuthModule } from '../auth';
import { ConfirmationModule } from '../confirmation';

@Module({
  imports: [MongoModule, AuthModule, ConfirmationModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
