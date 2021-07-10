import { RussianPhoneNumber } from './russian-phone-number.model';
import { RussianStandardPlate } from './russian-standard-plate.model';
import { StandardParking } from './standard-parking.model';
import { UniqueArray } from './interfaces/unique-array.interface';
import { User } from './interfaces/user.interface';

export class StandardUser implements User {
  readonly #phoneNumber: RussianPhoneNumber;
  readonly #email?: string;
  readonly #password: string;
  readonly #plates: UniqueArray<RussianStandardPlate>;
  readonly #parkings: StandardParking[];

  constructor(
    phoneNumber: RussianPhoneNumber,
    password: string,
    plates: UniqueArray<RussianStandardPlate>,
    parkings: StandardParking[],
    email?: string,
  ) {
    this.#phoneNumber = phoneNumber;
    this.#password = password;
    this.#plates = plates;
    this.#parkings = parkings;
    this.#email = email;
  }

  addPlate(plate: RussianStandardPlate) {
    this.#plates.push(plate);
  }

  registerParking(parking: StandardParking) {
    this.#parkings.push(parking);
  }

  lastParking(popOrPeek: 'pop' | 'peek') {
    if (popOrPeek === 'pop') {
      return this.#parkings.pop();
    }
    const last = this.#parkings.pop();
    this.#parkings.push(last);
    return last;
  }

  content() {
    return {
      phoneNumber: this.#phoneNumber.value,
      password: this.#password,
      plates: this.#plates.map((plate) => plate.value),
      parkings: this.#parkings.map((parking) => parking.content()),
      email: this.#email,
    };
  }
}
