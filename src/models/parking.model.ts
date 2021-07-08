import { PriceCalculator } from './price-calculator.interface';
import { StandardPriceCalculator } from '../infrastructure/standard-price-calculator.infrastructure';
import { v4 as uuid } from 'uuid';

export class Parking {
  readonly #parkingTitle: string;
  readonly #carPlate: string;
  readonly #entryCarTime: Date;
  readonly #departureCarTime: Date | null;
  readonly #isCompleted: boolean;
  readonly #priceRub: number | null;
  readonly #id: string = uuid(); // TODO: Refactor
  readonly #calculator: PriceCalculator;

  constructor(
    parkingTitle: string,
    carPlate: string,
    entryCarTime: Date,
    departureCarTime: Date,
    priceRub: number,
    isCompleted: boolean,
    calculator?: PriceCalculator,
  );
  constructor(
    parkingTitle: string,
    carPlate: string,
    entryCarTime: Date,
    calculator?: PriceCalculator,
  );
  constructor(...args) {
    this.#parkingTitle = args[0];
    this.#carPlate = args[1];
    this.#entryCarTime = args[2];
    if (args.length < 5) {
      this.#calculator = args[3] ?? new StandardPriceCalculator();
      this.#departureCarTime = null;
      this.#priceRub = null;
      this.#isCompleted = false;
      return;
    }
    this.#departureCarTime = args[3];
    this.#priceRub = args[4];
    this.#isCompleted = args[5];
    this.#calculator = args[6] ?? new StandardPriceCalculator();
  }

  info(asCompleted = false) {
    let depTime = this.#departureCarTime;
    let priceRub = this.#priceRub;
    if (!this.#isCompleted) {
      if (asCompleted) {
        if (!this.#departureCarTime) {
          depTime = new Date(Date.now());
        } else {
          depTime = this.#departureCarTime;
        }
        priceRub = this.#calculator.calculate(
          this.#parkingTitle,
          this.#timeDifferenceMin(depTime, this.#entryCarTime),
        );
      }
    }
    return {
      id: this.#id,
      parkingTitle: this.#parkingTitle,
      carPlate: this.#carPlate,
      entryCarTime: this.#entryCarTime,
      departureCarTime: depTime,
      priceRub: priceRub,
      isCompleted: this.#isCompleted,
    };
  }

  complete(departureCarTime: Date) {
    const price = this.#calculator.calculate(
      this.#parkingTitle,
      this.#timeDifferenceMin(this.#departureCarTime, this.#entryCarTime),
    );
    return new Parking(
      this.#parkingTitle,
      this.#carPlate,
      this.#entryCarTime,
      departureCarTime,
      price,
      true,
    );
  }

  #timeDifferenceMin(first: Date, second: Date) {
    return (first.getTime() - second.getTime()) / 60000;
  }
}
