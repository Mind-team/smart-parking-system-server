import { ParkingRecord } from '../../infrastructure/records/parking-record.interface';

export type DepartureCarParkingRecord = Pick<
  ParkingRecord,
  'carPlate' | 'departureCarTime'
>;
