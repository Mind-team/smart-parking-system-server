import { ParkingRecord } from '../../infrastructure/records/parking-record.infrastructure';
import { ParkingOwnerRecord } from '../../infrastructure/records/parking-owner-record.infrastructure';

type FromParkingRecord = Pick<ParkingRecord, 'carPlate' | 'departureCarTime'>;
type parkingOwnerId = ParkingOwnerRecord['id'];
type FromParkingOwnerRecord = {
  parkingOwnerId: parkingOwnerId;
};

export type DepartureCarParkingRecord = FromParkingRecord &
  FromParkingOwnerRecord;
