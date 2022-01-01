import { IParkingData } from './parking-data.interface';
import { NewParkingConstructor } from './new-parking-constructor.type';

export type ExistingParkingConstructor = NewParkingConstructor &
  Pick<IParkingData, 'parkingProcessesIds'>;
