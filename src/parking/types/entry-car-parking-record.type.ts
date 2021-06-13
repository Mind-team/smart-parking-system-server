import { ParkingRecord } from '../../infrastructure/records/parking-record.interface';

export type EntryCarParkingRecord = Omit<
  ParkingRecord,
  'departureCarTime' | 'priceRub' | 'parkingTimeMin'
>;
