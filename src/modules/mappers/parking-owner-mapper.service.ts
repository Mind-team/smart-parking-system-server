import { Injectable } from '@nestjs/common';
import { ParkingOwner } from '../../core/parking-owner';
import { ExistingParkingOwnerConstructor } from '../../core/parking-owner/existing-parking-owner-constructor.type';

@Injectable()
export class ParkingOwnerMapperService {
  constructor(private readonly parkingOwnerMongoService) {}

  fromDB(id: string) {
    const config: ExistingParkingOwnerConstructor = {};
    return new ParkingOwner();
  }
}
