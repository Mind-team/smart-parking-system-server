import { IUncompletedParkingProcessData } from './uncompleted-parking-process-data.interface';
import { ICompletedParkingProcessData } from './completed-parking-process-data.interface';

export type IParkingProcessData =
  | IUncompletedParkingProcessData
  | ICompletedParkingProcessData;
