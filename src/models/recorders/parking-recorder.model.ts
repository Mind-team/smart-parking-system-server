import { ParkingRecord } from '../../interfaces/records/parking-record.interface';
import { Recorder } from '../../interfaces/recorder.interface';

export class ParkingRecorder implements Recorder<ParkingRecord> {
  public formatForDB({
    carPlate,
    departureCarTime,
    entryCarTime,
    parkingTitle,
    priceRub,
    parkingTimeMin,
  }: ParkingRecord): ParkingRecord {
    return {
      carPlate,
      departureCarTime,
      entryCarTime,
      parkingTitle,
      priceRub,
      parkingTimeMin,
    };
  }
}
