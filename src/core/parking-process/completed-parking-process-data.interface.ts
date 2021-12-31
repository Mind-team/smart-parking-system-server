export interface ICompletedParkingProcessData {
  parkingId: string;
  driver: {
    carPlate: string;
  };
  payment: {
    currency: string;
    value: number;
  };
  entryCarTime: string;
  departureCarTime: string;
  isCompleted: true;
}
