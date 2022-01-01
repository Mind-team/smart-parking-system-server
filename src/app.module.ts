import { Module } from '@nestjs/common';
import { DriverModule } from './modules/driver/driver.module';

@Module({
  imports: [DriverModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
