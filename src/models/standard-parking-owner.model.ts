import { ParkingOwner } from './interfaces/parking-owner.interface';
import { ParkingOwnerContent } from './interfaces/parking-owner-content.interface';
import { StandardIdGenerator } from '../infrastructure/standard-id-generator.infrastructure';

export class StandardParkingOwner implements ParkingOwner {
  readonly #id: string;
  readonly #title: string;
  readonly #costCalculationFunction: string;

  constructor(id: string, title: string, costCalculationFunction: string);
  constructor(title: string, costCalculationFunction: string);
  constructor(...args) {
    if (args.length > 2) {
      this.#id = args[0];
      this.#title = args[1];
      this.#costCalculationFunction = args[2];
      return;
    }
    this.#id = new StandardIdGenerator().generate();
    this.#title = args[0];
    this.#costCalculationFunction = args[1];
  }

  content(): ParkingOwnerContent {
    return {
      id: this.#id,
      title: this.#title,
      costCalculationFunction: this.#costCalculationFunction,
    };
  }

  parkingCost(entryCarTime: Date, departureCarTime: Date): number {
    const parkingTimeMin = Math.round(
      (departureCarTime.getTime() - entryCarTime.getTime()) / 60000,
    );
    return eval(this.#costCalculationFunction)(parkingTimeMin);
  }
}
