export interface ParkingRecord {
  id: string;
  parkingTitle: string;
  carPlate: string;
  entryCarTime: Date;
  departureCarTime: Date | null;
  priceRub: number | null;
  isCompleted: boolean;
}
