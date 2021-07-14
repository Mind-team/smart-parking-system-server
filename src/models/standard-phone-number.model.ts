import { Validator } from './interfaces/validator.interface';
import { RussianPhoneNumberValidator } from '../infrastructure/russian-phone-number-validator.infrastructure';
import { PhoneNumber } from './interfaces/phone-number.interface';

export class StandardPhoneNumber implements PhoneNumber {
  readonly #value: string;
  readonly #validator: Validator<string>;

  constructor(
    value: string,
    validator: Validator<string> = new RussianPhoneNumberValidator(),
  ) {
    this.#validator = validator;
    this.#value = value;
  }

  get value(): string {
    try {
      if (!this.#validator.isValid(this.#value)) {
        const validPhoneNumber = this.#validator.tryFormat(this.#value);
        return new StandardPhoneNumber(validPhoneNumber).value;
      }
      return this.#value;
    } catch (e) {
      throw new Error(e);
    }
  }
}
