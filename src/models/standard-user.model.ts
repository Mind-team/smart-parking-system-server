import { UniqueArray } from './interfaces/unique-array.interface';
import { User } from './interfaces/user.interface';
import { PhoneNumber } from './interfaces/phone-number.interface';
import { Plate } from './interfaces/plate.interface';
import { Parking } from './interfaces/parking.interface';
import { RegisteredUserContent } from './interfaces/registered-user-content.interface';

export class StandardUser implements User<'Registered'> {
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

  registerParking(parking: Parking) {
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

  content(): RegisteredUserContent {
    return {
      phoneNumber: this.#phoneNumber.value,
      password: this.#password,
      plates: this.#plates.map((plate) => plate.value),
      parkings: this.#parkings.map((parking) => parking.content()),
      email: this.#email,
    };
  }
}
