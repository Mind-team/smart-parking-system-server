import { ParkingOwner } from '../models/interfaces/parking-owner.interface';

export interface ParkingOwnerFactory {
  owner: (
    _id: string,
    title: string,
    costCalculationFunction: string,
  ) => ParkingOwner;
}
