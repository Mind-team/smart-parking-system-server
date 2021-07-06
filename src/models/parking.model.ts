import { PriceCalculator } from './price-calculator.interface';
import { StandardPriceCalculator } from '../infrastructure/standard-price-calculator.infrastructure';

export class Parking {
  private readonly parkingTitle: string;
  private readonly carPlate: string;
  private readonly entryCarTime: Date;
  private departureCarTime: Date | null;
  private isCompleted: boolean;
  private priceRub: number | null;
  private readonly calculator: PriceCalculator;

  constructor(
    parkingTitle: string,
    carPlate: string,
    entryCarTime: Date,
    calculator?: PriceCalculator,
  ) {
    this.parkingTitle = parkingTitle;
    this.carPlate = carPlate;
    this.entryCarTime = entryCarTime;
    this.isCompleted = false;
    this.departureCarTime = null;
    this.priceRub = null;
    this.calculator = calculator ?? new StandardPriceCalculator();
  }

  public info(asCompleted = false) {
    let depTime = this.departureCarTime;
    let priceRub = this.priceRub;
    if (!this.isCompleted) {
      if (asCompleted) {
        if (!this.departureCarTime) {
          depTime = new Date(Date.now());
        } else {
          depTime = this.departureCarTime;
        }
        priceRub = this.calculator.calculate(
          this.parkingTitle,
          new Date(depTime).getTime() - new Date(this.entryCarTime).getTime(),
        );
      }
    }
    return {
      parkingTitle: this.parkingTitle,
      carPlate: this.carPlate,
      entryCarTime: this.entryCarTime,
      departureCarTime: depTime,
      priceRub: priceRub,
      isCompleted: this.isCompleted,
    };
  }

  public completeParking(departureCarTime: Date): void {
    this.departureCarTime = departureCarTime;
    this.priceRub = this.calculator.calculate(
      this.parkingTitle,
      new Date(this.departureCarTime).getTime() -
        new Date(this.entryCarTime).getTime(),
    );
    this.isCompleted = true;
  }
}
