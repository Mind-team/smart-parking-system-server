import { Validator } from './validator.interface';
import { PlateValidator } from '../infrastructure/plate-validator.infrastructure';

export class Plate {
  private readonly _value: string;
  private readonly _validator: Validator<string>;

  constructor(
    value: string,
    validator: Validator<string> = new PlateValidator(),
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
  }

  get value() {
    return this._value;
  }
}
