import { ParkingRecord } from '../interfaces/records/parking-record.interface';

export class ParkingHistoryElement implements ParkingRecord {
  private readonly _parkingTitle: string;
  private readonly _carPlate: string;
  private readonly _entryCarTime: Date;
  private readonly _departureCarTime: Date | null;
  private readonly _priceRub: number | null;

  constructor(
    parkingTitle: string,
    carPlate: string,
    entryCarTime: Date,
    departureCarTime: Date | null = null,
  ) {
    this._parkingTitle = parkingTitle;
    this._carPlate = carPlate;
    this._entryCarTime = entryCarTime;
    this._departureCarTime = departureCarTime;
    this._priceRub =
      departureCarTime !== null
        ? departureCarTime.getTime() - entryCarTime.getTime()
        : null;
  }

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
