import { PlateRecord } from '../infrastructure/records/plate-record.interface';

export class Plate implements PlateRecord {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
}
