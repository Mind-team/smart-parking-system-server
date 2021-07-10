import { Validator } from './interfaces/validator.interface';
import { PhoneNumberValidator } from '../infrastructure/phone-number-validator.infrastructure';
import { PhoneNumber } from './interfaces/phone-number.interface';

export class RussianPhoneNumber implements PhoneNumber {
  readonly #value: string;
  readonly #validator: Validator<string>;

  constructor(
    value: string,
    validator: Validator<string> = new PhoneNumberValidator(),
  ) {
    this.#validator = validator;
    this.#value = value;
  }

  get value() {
    try {
      if (!this.#validator.isValid(this.#value)) {
        const validPhoneNumber = this.#validator.tryFormat(this.#value);
        return new RussianPhoneNumber(validPhoneNumber);
      }
      return this.#value;
    } catch (e) {
      return e;
    }
  }
}
