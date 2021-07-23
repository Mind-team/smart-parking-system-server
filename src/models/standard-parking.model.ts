import { IdGenerator } from './interfaces/id-generator.interface';
import { StandardIdGenerator } from '../infrastructure/standard-id-generator.infrastructure';
import { Parking } from './interfaces/parking.interface';
import { ParkingContent } from './interfaces/parking-content.interface';
import { ParkingOwner } from './interfaces/parking-owner.interface';

export class StandardParking implements Parking {
  #id: string;
  readonly #parkingOwner: ParkingOwner;
  readonly #carPlate: string;
  readonly #entryCarTime: Date;
  readonly #departureCarTime: Date | null;
  readonly #isCompleted: boolean;
  readonly #priceRub: number | null;

  constructor(
    parkingOwner: ParkingOwner,
    carPlate: string,
    entryCarTime: Date,
    departureCarTime: Date,
    priceRub: number,
    isCompleted: boolean,
  );
  constructor(parkingOwner: ParkingOwner, carPlate: string, entryCarTime: Date);
  constructor(...args) {
    this.#id = new StandardIdGenerator().generate();
    this.#parkingOwner = args[0];
    this.#carPlate = args[1];
    this.#entryCarTime = args[2];
    if (args.length < 6) {
      this.#departureCarTime = null;
      this.#priceRub = null;
      this.#isCompleted = false;
      return;
    }
    this.#departureCarTime = args[3];
    this.#priceRub = args[4];
    this.#isCompleted = args[5];
  }

  updateId(idGenerator: IdGenerator) {
    this.#id = idGenerator.generate();
  }

  content(asCompleted = false): ParkingContent {
    let depTime = this.#departureCarTime;
    let priceRub = this.#priceRub;
    if (!this.#isCompleted) {
      if (asCompleted) {
        if (!this.#departureCarTime) {
          depTime = new Date(Date.now());
        } else {
          depTime = this.#departureCarTime;
        }
        priceRub = this.#parkingOwner.parkingCost(this.#entryCarTime, depTime);
      }
    }
    const { id, title } = this.#parkingOwner.content();
    return {
      id: this.#id,
      parkingOwnerId: id,
      parkingTitle: title,
      carPlate: this.#carPlate,
      entryCarTime: this.#entryCarTime,
      departureCarTime: depTime,
      priceRub: priceRub,
      isCompleted: this.#isCompleted,
    };
  }

  complete(departureCarTime: Date) {
    const price = this.#parkingOwner.parkingCost(
      this.#entryCarTime,
      departureCarTime,
    );
    return new StandardParking(
      this.#parkingOwner,
      this.#carPlate,
      this.#entryCarTime,
      departureCarTime,
      price,
      true,
    );
  }
}
