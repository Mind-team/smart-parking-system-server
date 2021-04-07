import { ParkingRecord } from '../interfaces/parking-record.interface';

export class PlainParkingRecord implements ParkingRecord {
  constructor(
    public carPlate: string,
    public departureCarTime: Date,
    public entryCarTime: Date,
    public parkingTitle: string,
    public priceRub: number,
  ) {}
}
