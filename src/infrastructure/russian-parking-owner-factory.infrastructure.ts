import { ParkingOwnerFactory } from './parking-owner-factory.infrastructure';
import { ParkingOwner } from '../models/interfaces/parking-owner.interface';
import { StandardParkingOwner } from '../models/standard-parking-owner.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RussianParkingOwnerFactory implements ParkingOwnerFactory {
  owner(
    _id: string,
    title: string,
    costCalculationFunction: string,
  ): ParkingOwner {
    return new StandardParkingOwner(_id, title, costCalculationFunction);
  }
}
