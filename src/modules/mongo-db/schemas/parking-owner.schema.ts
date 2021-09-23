import * as mongoose from 'mongoose';
import { ParkingOwnerRecord } from '../../../infrastructure/records/parking-owner-record.infrastructure';

export const ParkingOwnerSchema = new mongoose.Schema<
  mongoose.Document<ParkingOwnerRecord>
>({
  title: { type: String, require: true },
  costCalculationFunction: { type: String },
});

export type ParkingOwnerDocument = ParkingOwnerRecord & mongoose.Document;
