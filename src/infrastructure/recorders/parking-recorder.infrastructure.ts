import { ParkingRecord } from '../records/parking-record.infrastructure';
import { Recorder } from './recorder.interface';

export class ParkingRecorder implements Recorder<ParkingRecord> {
  public formatForDB({
    carPlate,
    departureCarTime,
    entryCarTime,
    parkingTitle,
    priceRub,
    parkingTimeMin,
    isCompleted,
  }: ParkingRecord): ParkingRecord {
    return {
      carPlate,
      departureCarTime,
      entryCarTime,
      parkingTitle,
      priceRub,
      parkingTimeMin,
      isCompleted,
    };
  }
}
