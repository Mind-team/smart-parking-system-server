import { IRegisteredDriverData } from './registered/registered-driver-data.interface';
import { IUnregisteredDriverData } from './unregistered/unregistered-driver-data.interface';
import { IParkingProcess } from '../parking-process';

export interface _IDriver<
  T extends IRegisteredDriverData | IUnregisteredDriverData,
> {
  data: () => T;
  //addPlate: (plate) => void;
  addCompletedParkingProcess: (parkingProcess: IParkingProcess) => void;
}

export type IDriver =
  | _IDriver<IRegisteredDriverData>
  | _IDriver<IUnregisteredDriverData>;
