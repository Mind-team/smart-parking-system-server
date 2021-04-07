import { ParkingRecord } from '../interfaces/parking-record.interface';
import { ParkingRecorder } from '../interfaces/parking-recorder.interface';

export class PlainParkingRecorder implements ParkingRecorder {
  private departureCarTime: Date = null;
  private priceRub: number = null;

  constructor(
    private parkingTitle: string,
    private carPlate: string,
    private entryCarTime: Date,
  ) {}

  public formatToDB() {
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
