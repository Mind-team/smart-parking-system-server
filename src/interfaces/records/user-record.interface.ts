import { ParkingRecord } from './parking-record.interface';
import { PhoneNumberRecord } from './phoneNumber-record.interface';

export interface UserRecord {
  phoneNumber: PhoneNumberRecord;
  password: string;
  email?: string;
  plates: string[];
  parkingHistory: ParkingRecord[];
}
