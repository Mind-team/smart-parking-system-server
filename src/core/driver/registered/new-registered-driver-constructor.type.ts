import { NewUnregisteredDriverConstructor } from '../unregistered/new-unregistered-driver-constructor.type';

export type NewRegisteredDriverConstructor =
  NewUnregisteredDriverConstructor & {
    phoneNumber: string;
    password: string;
    email?: string;
    parkingProcessIds: string[];
  };
