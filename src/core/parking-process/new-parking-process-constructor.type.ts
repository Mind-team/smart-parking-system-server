import { IDriver } from '../driver';

export type NewParkingProcessConstructor = {
  currency: string;
  parkingId: string;
  driver: IDriver;
  entryCarTime: string;
};
