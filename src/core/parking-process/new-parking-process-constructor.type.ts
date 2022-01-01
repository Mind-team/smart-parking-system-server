import { IDriver } from '../driver';

export type NewParkingProcessConstructor = {
  currency: string;
  parking: any; // TODO: Parking Model
  driver: IDriver; // TODO: Driver Model
  entryCarTime: string;
};
