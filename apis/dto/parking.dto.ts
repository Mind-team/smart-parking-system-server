interface ParkingDto {
  id: string;
  parkingOwnerId: string;
  parkingTitle: string;
  carPlate: string;
  entryCarTime: string;
  departureCarTime: string | null;
  priceRub: number | null;
  isCompleted: boolean;
}
