interface ParkingDto {
  id: string;
  parkingTitle: string;
  carPlate: string;
  entryCarTime: string;
  departureCarTime: string | null;
  priceRub: number | null;
  isCompleted: boolean;
}
