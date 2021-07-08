import { ParkingRecord } from '../../infrastructure/records/parking-record.infrastructure';

export type EntryCarParkingRecord = Pick<
  ParkingRecord,
  'parkingTitle' | 'carPlate' | 'entryCarTime'
>;
