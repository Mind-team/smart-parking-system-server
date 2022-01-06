import { IParkingData } from './parking-data.interface';
import { IDriver } from '../driver';
import { IParkingProcess } from '../parking-process';

export interface IParking {
  data: () => IParkingData;
  registerCarEntry: (driver: IDriver) => void;
  registerCarDeparture: (driver: IDriver) => void;
  parkingSpacesCount: () => { all: number; free: number; occupied: number };
  parkingProcessByDriverId: (driverId: string) => IParkingProcess;
  // TODO: add parkingProcessByDriverId & parkingProcessByDriverPlate
}
