import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { StandardRussianFactory } from '../infrastructure/standard-russian-factory.infrastructure';

const Factory = {
  provide: 'Factory',
  useClass: StandardRussianFactory,
};

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [ParkingController],
  providers: [ParkingService, Factory],
})
export class ParkingModule {}
