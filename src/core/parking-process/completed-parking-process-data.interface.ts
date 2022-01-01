export interface ICompletedParkingProcessData {
  _id: string;
  parkingId: string;
  driver: {
    _id: string;
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
