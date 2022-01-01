import { NewParkingConstructor } from './new-parking-constructor.type';
import { IParkingProcess } from '../parking-process';

export type ExistingParkingConstructor = NewParkingConstructor & {
  parkingProcesses: IParkingProcess[];
  _id: string;
};
