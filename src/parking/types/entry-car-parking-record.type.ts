import { ParkingRecord } from '../../infrastructure/records/parking-record.infrastructure';

export type EntryCarParkingRecord = Omit<
  ParkingRecord,
  'departureCarTime' | 'priceRub' | 'parkingTimeMin' | 'isCompleted'
>;
