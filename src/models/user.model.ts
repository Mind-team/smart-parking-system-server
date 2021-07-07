import { PhoneNumber } from './phone-number.model';
import { Plate } from './plate.model';
import { Parking } from './parking.model';
import { UniqueArray } from './unique-array.interface';

export class User {
  readonly #phoneNumber: PhoneNumber;
  readonly #email?: string;
  readonly #password: string;
  readonly #plates: UniqueArray<Plate>;
  readonly #parkings: Parking[];

  constructor(
    phoneNumber: PhoneNumber,
    password: string,
    plates: UniqueArray<Plate>,
    parkings: Parking[],
    email?: string,
  ) {
    this.#phoneNumber = phoneNumber;
    this.#password = password;
    this.#plates = plates;
    this.#parkings = parkings;
    this.#email = email;
  }

  addPlate(plate: Plate) {
    this.#plates.push(plate);
  }

  info() {
    return {
      phoneNumber: this.#phoneNumber.value,
      password: this.#password,
      plates: this.#plates.map((plate) => plate.value),
      parkings: this.#parkings.map((el) => el.info()),
      email: this.#email,
    };
  }
}
