export interface IUnregisteredDriverData {
  _id: string;
  carPlates: string[];
  parkingProcessIds: string[];
  currentParkingProcessId: string | null;
}
