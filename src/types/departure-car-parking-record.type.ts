import { ParkingRecord } from '../interfaces/parking-record.interface';

export type DepartureCarParkingRecord = Pick<
  ParkingRecord,
  'carPlate' | 'departureCarTime'
>;
