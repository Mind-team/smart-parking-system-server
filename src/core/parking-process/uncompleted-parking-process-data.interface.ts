export interface IUncompletedParkingProcessData {
  _id: string;
  parking: {
    _id: string;
    title: string;
  };
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
