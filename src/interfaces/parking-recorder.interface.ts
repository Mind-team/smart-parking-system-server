import { ParkingRecord } from './parking-record.interface';

export interface ParkingRecorder {
  formatToDB: () => ParkingRecord;
}
