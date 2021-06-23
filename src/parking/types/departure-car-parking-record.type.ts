import { ParkingRecord } from '../../infrastructure/records/parking-record.infrastructure';

export type DepartureCarParkingRecord = Pick<
  ParkingRecord,
  'carPlate' | 'departureCarTime'
>;
