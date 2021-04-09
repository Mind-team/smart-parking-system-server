import { ParkingRecord } from '../interfaces/records/parking-record.interface';

export type DepartureCarParkingRecord = Pick<
  ParkingRecord,
  'carPlate' | 'departureCarTime'
>;
