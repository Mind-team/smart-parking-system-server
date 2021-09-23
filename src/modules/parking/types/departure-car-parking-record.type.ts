import { ParkingRecord } from '../../../infrastructure/records/parking-record.infrastructure';
import { ParkingOwnerRecord } from '../../../infrastructure/records/parking-owner-record.infrastructure';

type FromParkingRecord = Pick<ParkingRecord, 'carPlate' | 'departureCarTime'>;

type FromParkingOwnerRecord = {
  parkingOwnerId: ParkingOwnerRecord['_id'];
};

export type DepartureCarParkingRecord = FromParkingRecord &
  FromParkingOwnerRecord;
