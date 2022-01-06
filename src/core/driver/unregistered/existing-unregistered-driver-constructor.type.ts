export type ExistingUnregisteredDriverConstructor = {
  _id: string;
  carPlate: string;
  parkingProcessIds: string[];
  currentParkingProcessId: string | null;
};
