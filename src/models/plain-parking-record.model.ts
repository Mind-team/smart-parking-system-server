import { ParkingRecord } from '../interfaces/parking-record.interface';
import { Recorder } from '../interfaces/recorder.interface';

export class ParkingRecorder implements Recorder<ParkingRecord> {
  private departureCarTime: Date = null;
  private priceRub: number = null;

  constructor(
    private parkingTitle: string,
    private carPlate: string,
    private entryCarTime: Date,
  ) {}

  public async formatForDB() {
    const record: ParkingRecord = {
      carPlate: this.carPlate,
      departureCarTime: this.departureCarTime,
      entryCarTime: this.entryCarTime,
      parkingTitle: this.parkingTitle,
      priceRub: this.priceRub,
    };
    return record;
  }
}
