import * as mongoose from 'mongoose';
import { ParkingRecord } from '../infrastructure/records/parking-record.infrastructure';

export const ParkingRecordSchema = new mongoose.Schema<
  mongoose.Document<ParkingRecord>
>({
  parkingOwnerId: { type: String, required: true },
  parkingTitle: { type: String, require: true },
  carPlate: { type: String, require: true },
  entryCarTime: { type: Date, required: true },
  departureCarTime: { type: Date },
  priceRub: { type: Number },
  isCompleted: { type: Boolean, required: true },
});
