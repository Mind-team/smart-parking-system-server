import { UniqueArray } from './interfaces/unique-array.interface';
import { Plate } from './interfaces/plate.interface';

export class UniquePlatesArray implements UniqueArray<Plate> {
  #value: Plate[];

  constructor(value: Plate[]) {
    this.#value = this.#makeUnique(value);
  }

  get value(): Plate[] {
    return this.#value;
  }

  push(el: Plate) {
    this.#value.push(el);
    this.#value = this.#makeUnique(this.#value);
  }

  map<U>(
    callbackfn: (value: Plate, index: number, array: Plate[]) => U,
    thisArg?: any,
  ): U[] {
    return this.#value.map(callbackfn);
  }

  #makeUnique(arr: Plate[]) {
    const seen = {};
    return arr.filter((plate) => {
      const key = JSON.stringify(plate);
      return !(key in seen) && (seen[key] = plate);
    });
  }
}