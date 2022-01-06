import { IParkingOwnerData } from './parking-owner-data.interface';

export type NewParkingOwnerConstructor = Pick<
  IParkingOwnerData,
  'name' | 'password'
>;
