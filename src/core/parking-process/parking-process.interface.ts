import { IParkingProcessData } from './parking-process-data.interface';

export interface IParkingProcess {
  data: () => IParkingProcessData;
  complete: () => void;
}
