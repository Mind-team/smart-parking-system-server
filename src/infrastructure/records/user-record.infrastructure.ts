import { ParkingRecord } from './parking-record.infrastructure';
import { PlateRecord } from './plate-record.infrastructure';
import { PhoneNumberRecord } from './phoneNumber-record.infrastructure';

export interface UserRecord {
  phoneNumber: PhoneNumberRecord;
  password: string;
  email?: string;
  plates: PlateRecord[];
  parkingHistory: ParkingRecord[];
}
