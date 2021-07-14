import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { RussianFactory } from '../infrastructure/russian-factory.infrastructure';

const Factory = {
  provide: 'Factory',
  useClass: RussianFactory,
};

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [ParkingController],
  providers: [ParkingService, Factory],
})
export class ParkingModule {}
