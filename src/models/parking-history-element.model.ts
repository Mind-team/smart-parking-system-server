import { ParkingRecord } from '../interfaces/records/parking-record.interface';

export class ParkingHistoryElement implements ParkingRecord {
  private readonly _parkingTitle: string;
  private readonly _carPlate: string;
  private readonly _entryCarTime: Date;
  private readonly _departureCarTime: Date | null;
  private readonly _priceRub: number | null;
  private readonly _parkingTime: number | null;

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
    if (this._departureCarTime) {
      this._parkingTime =
        new Date(departureCarTime).getTime() -
        new Date(entryCarTime).getTime() / 6000; // Перевод в минуты
      this._priceRub = this._parkingTime * 2; // TODO: здесь будем использовать правила паркинга как-то
    }
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
  get parkingTime() {
    return this._parkingTime;
  }
}
