import * as mongoose from 'mongoose';
import { UserRecord } from '../interfaces/user-record.interface';
import { ParkingRecordSchema } from './parking-record.schema';

export const UserSchema = new mongoose.Schema<mongoose.Document<UserRecord>>({
  phoneNumber: { type: String, require: true, unique: true },
  password: { type: String, require: true, minLength: 6 },
  email: { type: String, unique: false, sparse: true },
  plates: [
    {
      type: String,
      unique: true,
      sparse: true,
    },
  ],
  parkingHistory: [ParkingRecordSchema],
});

export type UserDocument = UserRecord & mongoose.Document;
