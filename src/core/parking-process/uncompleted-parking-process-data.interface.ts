export interface IUncompletedParkingProcessData {
  parkingId: string;
  driver: {
    carPlate: string;
  };
  payment: {
    currency: string;
    value: null;
  };
  entryCarTime: string;
  departureCarTime: null;
  isCompleted: false;
}
