import { PriceCalculator } from '../models/interfaces/price-calculator.interface';

export class StandardPriceCalculator implements PriceCalculator {
  calculate(parkingTitle: string, parkingTimeMin: number) {
    return 100 * Math.round(parkingTimeMin);
  }
}
