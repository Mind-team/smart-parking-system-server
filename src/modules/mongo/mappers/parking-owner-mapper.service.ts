import { Injectable } from '@nestjs/common';
import {
  ParkingOwner,
  ExistingParkingOwnerConstructor,
  IParkingOwner,
} from '../../../core/parking-owner';
import { ParkingOwnerMongoService } from '../services/parking-owner-mongo.service';
import { MongoParkingOwner } from '../schemas/parking-owner.schema';

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
      password: mongo.password,
    };

    return new ParkingOwner(config);
  }

  toDB(
    model: IParkingOwner,
    additional: { refreshToken: string },
  ): MongoParkingOwner {
    return { ...model.data(), refreshToken: additional.refreshToken };
  }
}
