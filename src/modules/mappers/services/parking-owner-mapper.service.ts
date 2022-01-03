import { Injectable } from '@nestjs/common';
import {
  ParkingOwner,
  ExistingParkingOwnerConstructor,
  NewParkingOwnerConstructor,
  IParkingOwner,
} from '../../../core/parking-owner';
import { MongoParkingOwner, ParkingOwnerMongoService } from '../../mongo';

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

  toDB(model: IParkingOwner): MongoParkingOwner {
    return model.data();
  }
}
