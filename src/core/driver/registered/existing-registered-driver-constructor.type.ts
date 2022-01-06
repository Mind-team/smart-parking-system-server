import { NewRegisteredDriverConstructor } from './new-registered-driver-constructor.type';

export type ExistingRegisteredDriverConstructor =
  NewRegisteredDriverConstructor & {
    _id: string;
    currentParkingProcessId: string;
  };
