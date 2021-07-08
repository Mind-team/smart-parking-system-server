import { Validator } from './validator.interface';
import { PlateValidator } from '../infrastructure/plate-validator.infrastructure';

export class Plate {
  #value: string;
  readonly #validator: Validator<string>;

  constructor(
    value: string,
    validator: Validator<string> = new PlateValidator(),
  ) {
    this.#validator = validator;
    this.#value = value;
  }

  get value() {
    try {
      if (!this.#validator.isValid(this.#value)) {
        this.#value = this.#validator.tryFormat(this.#value);
      }
      return this.#value;
    } catch (e) {
      return e;
    }
  }
}
