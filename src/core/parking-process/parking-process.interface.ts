import { IParkingProcessData } from './parking-process-data.interface';

export interface IParkingProcess {
  data: (asCompleted?: boolean) => IParkingProcessData;
  complete: () => void;
}
