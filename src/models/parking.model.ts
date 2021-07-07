import { PriceCalculator } from './price-calculator.interface';
import { StandardPriceCalculator } from '../infrastructure/standard-price-calculator.infrastructure';

export class Parking {
  readonly #parkingTitle: string;
  readonly #carPlate: string;
  readonly #entryCarTime: Date;
  #departureCarTime: Date | null;
  #isCompleted: boolean;
  #priceRub: number | null;
  private readonly calculator: PriceCalculator; // TODO: ?! completeParking method

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
      this.#departureCarTime = null;
      this.#priceRub = null;
      this.#isCompleted = false;
      return;
    }
    this.calculator = args[3] ?? new StandardPriceCalculator();
    this.#departureCarTime = args[3];
    this.#priceRub = args[4];
    this.#isCompleted = args[5];
    this.calculator = args[6] ?? new StandardPriceCalculator();
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
        priceRub = this.calculator.calculate(
          this.#parkingTitle,
          depTime.getTime() - this.#entryCarTime.getTime(),
        );
      }
    }
    return {
      parkingTitle: this.#parkingTitle,
      carPlate: this.#carPlate,
      entryCarTime: this.#entryCarTime,
      departureCarTime: depTime,
      priceRub: priceRub,
      isCompleted: this.#isCompleted,
    };
  }

  complete(departureCarTime: Date, calculator: PriceCalculator): Parking {
    const price = calculator.calculate(
      this.#parkingTitle,
      new Date(this.#departureCarTime).getTime() -
        new Date(this.#entryCarTime).getTime(),
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
}
