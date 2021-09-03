import { ParkingRecord } from '../../infrastructure/records/parking-record.infrastructure';
import { ParkingOwnerRecord } from '../../infrastructure/records/parking-owner-record.infrastructure';

type FromParkingRecord = Pick<ParkingRecord, 'carPlate' | 'entryCarTime'>;

type FromParkingOwnerRecord = {
  parkingOwnerId: ParkingOwnerRecord['id'];
};

export type EntryCarParkingRecord = FromParkingRecord & FromParkingOwnerRecord;
