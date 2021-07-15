import { ParkingRecord } from './parking-record.infrastructure';

export interface UnregisteredUserRecord {
  plates: string[];
  parkings: ParkingRecord[];
}
