import { DriverType } from '../driver-type.enum';

export interface _IUnregisteredDriverData {
  _id: string;
  carPlates: string[];
  parkingProcessIds: string[];
  currentParkingProcessId: string | null;
}

export type IUnregisteredDriverData = _IUnregisteredDriverData & {
  type: DriverType.Unregistered;
};
