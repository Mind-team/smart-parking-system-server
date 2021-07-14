import { Validator } from './interfaces/validator.interface';
import { RussianPlateValidator } from '../infrastructure/russian-plate-validator.infrastructure';
import { Plate } from './interfaces/plate.interface';
import { StandardPhoneNumber } from './standard-phone-number.model';

export class StandardPlate implements Plate {
  readonly #value: string;
  readonly #validator: Validator<string>;

  constructor(
    value: string,
    validator: Validator<string> = new RussianPlateValidator(),
  ) {
    this.#validator = validator;
    this.#value = value;
  }

  get value(): string {
    try {
      if (!this.#validator.isValid(this.#value)) {
        const validPlate = this.#validator.tryFormat(this.#value);
        return new StandardPhoneNumber(validPlate).value;
      }
      return this.#value;
    } catch (e) {
      throw new Error(e);
    }
  }
}
