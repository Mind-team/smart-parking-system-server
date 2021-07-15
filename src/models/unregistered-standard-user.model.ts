import { User } from './interfaces/user.interface';
import { UniqueArray } from './interfaces/unique-array.interface';
import { Plate } from './interfaces/plate.interface';
import { Parking } from './interfaces/parking.interface';
import { UnregisteredUserContent } from './interfaces/unregistered-user-content.interface';

export class UnregisteredStandardUser implements User<'Unregistered'> {
  readonly #plates: UniqueArray<Plate>;
  readonly #parkings: Parking[];

  constructor(plates: UniqueArray<Plate>, parkings: Parking[]) {
    this.#plates = plates;
    this.#parkings = parkings;
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

  content(): UnregisteredUserContent {
    return {
      plates: this.#plates.map((plate) => plate.value),
      parkings: this.#parkings.map((parking) => parking.content()),
    };
  }
}
