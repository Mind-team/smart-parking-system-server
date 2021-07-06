import { ParkingRecord } from './parking-record.infrastructure';

export interface UserRecord {
  phoneNumber: string;
  password: string;
  email?: string;
  plates: string[];
  parkings: ParkingRecord[];
}
