import { Injectable } from '@nestjs/common';
import { ParkingMongoService } from '../mongo/services/parking-mongo.service';
import { IParkingData, Parking } from '../../core/parking';
import { NewParkingConstructor } from '../../core/parking/new-parking-constructor.type';

@Injectable()
export class ParkingService {
  constructor(private readonly parkingMongoService: ParkingMongoService) {}

  async createParking(
    data: Pick<IParkingData, 'ownerId' | 'name' | 'address'> & {
      parkingSpacesCount: number;
    },
  ) {
    const newParkingConfig: NewParkingConstructor = {
      name: data.name,
      address: data.address,
      parkingSpacesCount: data.parkingSpacesCount,
    };
    const parkingModel = new Parking();
  }
}
