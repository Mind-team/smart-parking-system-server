import { ParkingOwner } from '../models/interfaces/parking-owner.interface';
import { OwnerFactoryConstructor } from './types/owner-factory-constructor.infrastructure';

export interface ParkingOwnerFactory {
  owner: (...args: OwnerFactoryConstructor) => ParkingOwner;
}
