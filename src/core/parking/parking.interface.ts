import { IParkingData } from './parking-data.interface';
import { IDriver } from '../driver';

export interface IParking {
  data: () => IParkingData;
  registerCarEntry: (driver: IDriver) => void;
  registerCarDeparture: (driver: IDriver) => void;
  parkingSpacesCount: () => { all: number; free: number; occupied: number };
  // TODO: add parkingProcessByDriverId & parkingProcessByDriverPlate
}
