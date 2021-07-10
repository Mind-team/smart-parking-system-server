export interface PriceCalculator {
  calculate: (parkingTitle: string, parkingTimeMin: number) => number;
}
