import { ParkingOwnerContent } from './parking-owner-content.interface';

export interface ParkingOwner {
  content: () => ParkingOwnerContent;
  parkingCost: (entryCarTime: Date, departureCarTime: Date) => number;
}
