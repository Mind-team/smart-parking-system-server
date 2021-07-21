import { ParkingOwnerFactory } from './parking-owner-factory.infrastructure';
import { ParkingOwner } from '../models/interfaces/parking-owner.interface';
import { StandardParkingOwner } from '../models/standard-parking-owner.model';
import { Injectable } from '@nestjs/common';
import { OwnerFactoryConstructor } from './types/owner-factory-constructor.infrastructure';

@Injectable()
export class RussianParkingOwnerFactory implements ParkingOwnerFactory {
  owner(...args: OwnerFactoryConstructor): ParkingOwner {
    if (args.length > 2) {
      return new StandardParkingOwner(args[0], args[1], args[2]);
    }
    return new StandardParkingOwner(args[0], args[1]);
  }
}
