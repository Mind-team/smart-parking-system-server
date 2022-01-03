import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  NewParkingOwnerConstructor,
  ParkingOwner,
} from '../../core/parking-owner';
import { ParkingOwnerMongoService } from '../mongo';
import { ParkingOwnerMapperService } from '../mappers';

@Injectable()
export class ParkingOwnerService {
  constructor(
    private readonly parkingOwnerMongoService: ParkingOwnerMongoService,
    private readonly parkingOwnerMapperService: ParkingOwnerMapperService,
  ) {}

  async registerParkingOwner(data: NewParkingOwnerConstructor) {
    const model = new ParkingOwner(data);
    try {
      await this.parkingOwnerMongoService.save(
        this.parkingOwnerMapperService.toDB(model),
      );
    } catch (e) {
      throw new InternalServerErrorException('Что-то пошло не так');
    }
  }
}
