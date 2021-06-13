import { PhoneNumberRecord } from '../infrastructure/records/phoneNumber-record.interface';

export class PhoneNumber implements PhoneNumberRecord {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
}
