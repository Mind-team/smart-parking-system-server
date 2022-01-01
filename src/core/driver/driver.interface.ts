import { IRegisteredDriverData } from './registered/registered-driver-data.interface';
import { IUnregisteredDriverData } from './unregistered/unregistered-driver-data.interface';

export interface IDriver<
  T extends IRegisteredDriverData | IUnregisteredDriverData,
> {
  data: () => T;
  //addPlate: (plate) => void;
  //addCompletedParkingProcess: (parkingProcess) => void;
}
