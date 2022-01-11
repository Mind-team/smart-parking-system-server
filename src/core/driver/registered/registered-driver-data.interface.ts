import { _IUnregisteredDriverData } from '../unregistered/unregistered-driver-data.interface';
import { DriverType } from '../driver-type.enum';

export interface _IRegisteredDriverData extends _IUnregisteredDriverData {
  phoneNumber: string;
  password: string;
  email?: string;
}

export type IRegisteredDriverData = _IRegisteredDriverData & {
  type: DriverType.Registered;
};
