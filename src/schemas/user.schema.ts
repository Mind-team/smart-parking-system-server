import * as mongoose from 'mongoose';
import { RegisteredUserRecord } from '../infrastructure/records/registered-user-record.infrastructure';
import { ParkingRecordSchema } from './parking-record.schema';

export const UserSchema = new mongoose.Schema<
  mongoose.Document<RegisteredUserRecord>
>({
  phoneNumber: { type: String, require: true, unique: true },
  password: { type: String, require: true, minLength: 6 },
  email: { type: String, unique: false, sparse: true },
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

export type UserDocument = RegisteredUserRecord & mongoose.Document;
