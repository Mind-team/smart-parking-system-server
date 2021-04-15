import { ParkingRecord } from '../interfaces/records/parking-record.interface';

export class ParkingHistoryElement implements ParkingRecord {
  constructor(
    private readonly _parkingTitle: string,
    private readonly _carPlate: string,
    private readonly _entryCarTime: Date,
    private readonly _departureCarTime: Date,
    private readonly _priceRub: number,
  ) {}

  get parkingTitle() {
    return this._parkingTitle;
  }
  get carPlate() {
    return this._carPlate;
  }
  get entryCarTime() {
    return this._entryCarTime;
  }
  get departureCarTime() {
    return this._departureCarTime;
  }
  get priceRub() {
    return this._priceRub;
  }
}
