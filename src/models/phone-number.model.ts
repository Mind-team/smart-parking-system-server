import { Validator } from './validator.interface';
import { PhoneNumberValidator } from '../infrastructure/phone-number-validator.infrastructure';

export class PhoneNumber {
  private readonly _value: string;
  private readonly _validator: Validator<string>;

  constructor(
    value: string,
    validator: Validator<string> = new PhoneNumberValidator(),
  ) {
    this._validator = validator;
    if (!this._validator.isValid(value)) {
      const newValue = this._validator.tryFormat(value);
      if (typeof newValue !== 'string') {
        throw newValue;
      }
      this._value = newValue;
    }
    this._value = value;
    console.log(value);
  }

  get value() {
    return this._value;
  }
}
