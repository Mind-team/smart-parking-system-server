import { IRegisteredDriverData } from './registered/registered-driver-data.interface';
import { IUnregisteredDriverData } from './unregistered/unregistered-driver-data.interface';

export interface _IDriver<
  T extends IRegisteredDriverData | IUnregisteredDriverData,
> {
  data: () => T;
  //addPlate: (plate) => void;
  completeParkingProcess: () => void;
  registerParkingProcess: (parkingProcessId: string) => void;
  lastParkingProcessId: () => string;
}

export type IDriver =
  | _IDriver<IRegisteredDriverData>
  | _IDriver<IUnregisteredDriverData>;
