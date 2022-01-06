import { Injectable } from '@nestjs/common';
import { ParkingMongoService, ParkingOwnerMongoService } from '../../mongo';
import {
  ExistingParkingConstructor,
  IParking,
  Parking,
} from '../../../core/parking';
import { ParkingOwnerMapperService } from './parking-owner-mapper.service';

@Injectable()
export class ParkingMapperService {
  constructor(
    private readonly parkingMongoService: ParkingMongoService,
    private readonly parkingOwnerMongoService: ParkingOwnerMongoService,
    private readonly parkingOwnerMapperService: ParkingOwnerMapperService,
  ) {}

  async fromDB(id: string): IParking {
    const parkingDB = await this.parkingMongoService.findById(id);
    const parkingOwnerModel = await this.parkingOwnerMapperService.fromDB(
      parkingDB.ownerId,
    );
    const config: ExistingParkingConstructor = {
      name: parkingDB.name,
      address: parkingDB.address,
      owner: parkingOwnerModel,
      parkingSpacesCount: parkingDB.parkingSpacesCount,
    };
    return new Parking();
  }
}
