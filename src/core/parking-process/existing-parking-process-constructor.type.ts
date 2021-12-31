import { NewParkingProcessConstructor } from './new-parking-process-constructor.type';

export type ExistingParkingProcessConstructor = NewParkingProcessConstructor & {
  departureCarTime: string;
};
