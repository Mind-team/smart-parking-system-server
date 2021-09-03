import { ParkingOwner } from './interfaces/parking-owner.interface';
import { ParkingOwnerContent } from './interfaces/parking-owner-content.interface';

export class StandardParkingOwner implements ParkingOwner {
  readonly #_id: string;
  readonly #title: string;
  readonly #costCalculationFunction: string;

  constructor(id: string, title: string, costCalculationFunction: string) {
    this.#_id = id;
    this.#title = title;
    this.#costCalculationFunction = costCalculationFunction;
  }

  content(): ParkingOwnerContent {
    return {
      _id: this.#_id,
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
