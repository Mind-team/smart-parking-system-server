import { Module } from '@nestjs/common';
import { ParkingOwnerController } from './parking-owner.controller';
import { ParkingOwnerService } from './parking-owner.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingOwnerSchema } from '../mongo-db/schemas/parking-owner.schema';
import { RussianParkingOwnerFactory } from '../../infrastructure/russian-parking-owner-factory.infrastructure';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'parking-owner', schema: ParkingOwnerSchema },
    ]),
  ],
  controllers: [ParkingOwnerController],
  providers: [
    ParkingOwnerService,
    { provide: 'ParkingOwnerFactory', useClass: RussianParkingOwnerFactory },
  ],
})
export class ParkingOwnerModule {}
