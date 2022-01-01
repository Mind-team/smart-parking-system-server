import { IParkingData } from './parking-data.interface';

export interface IParking {
  data: () => IParkingData;
  registerCarEntry: () => void;
  registerCarDeparture: () => void;
  parkingSpacesCount: () => { all: number; free: number; occupied: number };
}
