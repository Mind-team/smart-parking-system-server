import { ParkingRecord } from './parking-record.interface';

export interface UserRecord {
  phoneNumber: string;
  password: string;
  email?: string;
  plates: string[]; // TODO: When create plate model, change string[] on plates[]
  parkingHistory: ParkingRecord[];
}
