import { Injectable } from '@nestjs/common';
import { ParkingOwner } from '../../../core/parking-owner';
import { ExistingParkingOwnerConstructor } from '../../../core/parking-owner';
import { ParkingOwnerMongoService } from '../../mongo';

@Injectable()
export class ParkingOwnerMapperService {
  constructor(
    private readonly parkingOwnerMongoService: ParkingOwnerMongoService,
  ) {}

  async fromDB(id: string) {
    const mongo = await this.parkingOwnerMongoService.findById(id);
    const config: ExistingParkingOwnerConstructor = {
      _id: mongo._id,
      name: mongo.name,
      parkingsIds: mongo.parkingsIds,
    };

    return new ParkingOwner(config);
  }
}
