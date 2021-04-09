import { ParkingRecord } from './parking-record.interface';

export interface UserRecord {
  phoneNumber: string;
  password: string;
  email?: string;
  plates: string[];
  parkingHistory: ParkingRecord[];
}
