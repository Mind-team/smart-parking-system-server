import * as mongoose from 'mongoose';
import { ParkingRecordSchema } from './parking-record.schema';
import { UnregisteredUserRecord } from '../../../infrastructure/records/unregistered-user-record.infrastructure';

export const UnregisteredUserSchema = new mongoose.Schema({
  plates: [
    {
      type: String,
      require: true,
      unique: true,
      sparse: true,
    },
  ],
  parkings: [ParkingRecordSchema],
});

export type UnregisteredUserDocument = UnregisteredUserRecord &
  mongoose.Document;
