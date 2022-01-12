import { IDriver } from '../driver';

export type NewParkingProcessConstructor = {
  currency: string;
  parking: { _id: string; title: string };
  driver: IDriver;
  entryCarTime: string;
  transportPlate: string;
};
