import { IRegisteredDriverData } from './registered/registered-driver-data.interface';
import { IUnregisteredDriverData } from './unregistered/unregistered-driver-data.interface';
import { DriverType } from './driver-type.enum';

export interface _IDriver<
  T extends IRegisteredDriverData | IUnregisteredDriverData,
> {
  data: () => T;
  //addPlate: (plate) => void;
  completeParkingProcess: () => void;
  registerParkingProcess: (parkingProcessId: string) => void;
  lastParkingProcessId: () => string;
  type: () => DriverType;
}

export type IDriver =
  | _IDriver<IRegisteredDriverData>
  | _IDriver<IUnregisteredDriverData>;
