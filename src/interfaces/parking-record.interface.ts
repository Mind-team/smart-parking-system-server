export interface ParkingRecord {
  parkingTitle: string;
  carPlate: string;
  entryCarTime: Date;
  departureCarTime: Date | null;
  priceRub: number | null;
}

export type EntryCarParkingRecord = Omit<
  ParkingRecord,
  'departureCarTime' | 'priceRub'
>;

export type DepartureCarParkingRecord = Pick<
  ParkingRecord,
  'carPlate' | 'departureCarTime'
>;
