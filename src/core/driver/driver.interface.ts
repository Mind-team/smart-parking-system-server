import { IRegisteredDriverData } from './registered/registered-driver-data.interface';
import { IUnregisteredDriverData } from './unregistered/unregistered-driver-data.interface';

export interface _IDriver<
  T extends IRegisteredDriverData | IUnregisteredDriverData,
> {
  data: () => T;
  //addPlate: (plate) => void;
  //addCompletedParkingProcess: (parkingProcess) => void;
}

export type IDriver =
  | _IDriver<IRegisteredDriverData>
  | _IDriver<IUnregisteredDriverData>;
