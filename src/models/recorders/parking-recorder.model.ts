import { ParkingRecord } from '../../interfaces/records/parking-record.interface';
import { Recorder } from '../../interfaces/recorder.interface';

export class ParkingRecorder implements Recorder<ParkingRecord> {
  public formatForDB(model: ParkingRecord): ParkingRecord {
    return {
      carPlate: model.carPlate,
      departureCarTime: model.departureCarTime,
      entryCarTime: model.entryCarTime,
      parkingTitle: model.parkingTitle,
      priceRub: model.priceRub,
      parkingTimeMin: model.parkingTimeMin,
    };
  }
}
