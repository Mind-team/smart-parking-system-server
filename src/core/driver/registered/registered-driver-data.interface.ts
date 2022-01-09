import { IUnregisteredDriverData } from '../unregistered/unregistered-driver-data.interface';

export interface IRegisteredDriverData extends IUnregisteredDriverData {
  phoneNumber: string;
  password: string;
  email?: string;
  // TODO: payment какой нибудь
}
