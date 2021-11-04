import * as mongoose from 'mongoose';
import { RegisteredUserRecord } from '../../../infrastructure/records/registered-user-record.infrastructure';
import { ParkingRecordSchema } from './parking-record.schema';

export const RegisteredUserSchema = new mongoose.Schema<
  mongoose.Document<RegisteredUserRecord>
>({
  // TODO: Fix
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

export type RegisteredUserDocument = RegisteredUserRecord & mongoose.Document;
