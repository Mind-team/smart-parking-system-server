import { PriceCalculator } from '../models/price-calculator.interface';

export class StandardPriceCalculator implements PriceCalculator {
  calculate(parkingTitle: string, parkingTimeMin: number): number {
    return 100 * Math.round(parkingTimeMin);
  }
}
