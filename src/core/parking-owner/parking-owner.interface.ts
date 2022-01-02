import { IParkingOwnerData } from './parking-owner-data.interface';

export interface IParkingOwner {
  data: () => IParkingOwnerData;
}
