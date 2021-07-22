import { ParkingRecord } from '../../infrastructure/records/parking-record.infrastructure';
import { ParkingOwnerRecord } from '../../infrastructure/records/parking-owner-record.infrastructure';

export type FromParkingRecord = Pick<
  ParkingRecord,
  'carPlate' | 'entryCarTime'
>;

type parkingOwnerId = ParkingOwnerRecord['id'];

type FromParkingOwnerRecord = {
  parkingOwnerId: parkingOwnerId;
};

export type EntryCarParkingRecord = FromParkingRecord & FromParkingOwnerRecord;
