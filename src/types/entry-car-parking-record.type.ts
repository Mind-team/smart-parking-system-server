import { ParkingRecord } from '../interfaces/parking-record.interface';

export type EntryCarParkingRecord = Omit<
  ParkingRecord,
  'departureCarTime' | 'priceRub'
>;
