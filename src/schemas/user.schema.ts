import * as mongoose from 'mongoose';
import { UserRecord } from '../infrastructure/records/user-record.infrastructure';
import { ParkingRecordSchema } from './parking-record.schema';

export const UserSchema = new mongoose.Schema<mongoose.Document<UserRecord>>({
  phoneNumber: {
    value: { type: String, require: true, unique: true },
  },
  password: { type: String, require: true, minLength: 6 },
  email: { type: String, unique: false, sparse: true },
  plates: [
    {
      value: {
        type: String,
        require: true,
        unique: true,
        sparse: true,
      },
    },
  ],
  parkingHistory: [ParkingRecordSchema],
});

export type UserDocument = UserRecord & mongoose.Document;
