export interface IUncompletedParkingProcessData {
  _id: string;
  parkingId: string;
  driver: {
    _id: string;
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
