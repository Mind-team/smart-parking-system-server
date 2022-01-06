export interface IParkingData {
  _id: string;
  ownerId: string;
  name: string;
  address: string;
  parkingProcessesIds: string[];
  parkingSpacesCount: number;
}
