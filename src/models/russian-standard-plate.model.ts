import { Validator } from './interfaces/validator.interface';
import { PlateValidator } from '../infrastructure/plate-validator.infrastructure';
import { Plate } from './interfaces/plate.interface';
import { RussianPhoneNumber } from './russian-phone-number.model';

export class RussianStandardPlate implements Plate {
  readonly #value: string;
  readonly #validator: Validator<string>;

  constructor(
    value: string,
    validator: Validator<string> = new PlateValidator(),
  ) {
    this.#validator = validator;
    this.#value = value;
  }

  get value(): string {
    try {
      if (!this.#validator.isValid(this.#value)) {
        const validPlate = this.#validator.tryFormat(this.#value);
        return new RussianPhoneNumber(validPlate).value;
      }
      return this.#value;
    } catch (e) {
      throw new Error(e);
    }
  }
}
