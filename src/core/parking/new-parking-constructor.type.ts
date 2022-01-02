import { IParkingData } from './parking-data.interface';
import { IParkingOwner } from '../parking-owner';

export type NewParkingConstructor = Pick<IParkingData, 'name' | 'address'> & {
  owner: IParkingOwner;
  parkingSpacesCount: number;
};
