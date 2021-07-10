import { UniqueArray } from '../models/interfaces/unique-array.interface';
import { RussianStandardPlate } from '../models/russian-standard-plate.model';

export class UniquePlatesArray implements UniqueArray<RussianStandardPlate> {
  #value: RussianStandardPlate[];

  constructor(value: RussianStandardPlate[]) {
    this.#value = this.#makeUnique(value);
  }

  get value(): RussianStandardPlate[] {
    return this.#value;
  }

  push(el: RussianStandardPlate) {
    this.#value.push(el);
    this.#value = this.#makeUnique(this.#value);
  }

  map<U>(
    callbackfn: (
      value: RussianStandardPlate,
      index: number,
      array: RussianStandardPlate[],
    ) => U,
    thisArg?: any,
  ): U[] {
    return this.#value.map(callbackfn);
  }

  #makeUnique(arr: RussianStandardPlate[]) {
    const seen = {};
    return arr.filter((plate) => {
      const key = JSON.stringify(plate);
      return !(key in seen) && (seen[key] = plate);
    });
  }
}
