import { ParkingRecord } from './parking-record.interface';
import { PlateRecord } from './plate-record.interface';
import { PhoneNumberRecord } from './phoneNumber-record.interface';

export interface UserRecord {
  phoneNumber: PhoneNumberRecord;
  password: string;
  email?: string;
  plates: PlateRecord[];
  parkingHistory: ParkingRecord[];
}
