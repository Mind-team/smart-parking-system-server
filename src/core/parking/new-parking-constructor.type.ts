import { IParkingData } from './parking-data.interface';

export type NewParkingConstructor = Pick<IParkingData, 'name' | 'address'> & {
  owner: any;
};
