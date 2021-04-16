export interface ParkingRecord {
  parkingTitle: string;
  carPlate: string;
  entryCarTime: Date;
  departureCarTime: Date | null;
  priceRub: number;
}
