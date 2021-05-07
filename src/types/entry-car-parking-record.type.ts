import { ParkingRecord } from '../interfaces/records/parking-record.interface';

export type EntryCarParkingRecord = Omit<
  ParkingRecord,
  'departureCarTime' | 'priceRub' | 'parkingTimeMin'
>;
