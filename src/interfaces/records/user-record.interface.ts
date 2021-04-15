import { ParkingRecord } from './parking-record.interface';
import { PlateRecord } from './plate-record.interface';

export interface UserRecord {
  phoneNumber: string;
  password: string;
  email?: string;
  plates: PlateRecord[];
  parkingHistory: ParkingRecord[];
}
