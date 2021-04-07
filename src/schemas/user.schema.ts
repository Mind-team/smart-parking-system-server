import * as mongoose from 'mongoose';
import { User } from '../interfaces/user.interface';
import { ParkingRecordSchema } from './parking-record.schema';

export const UserSchema = new mongoose.Schema<mongoose.Document<User>>({
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

export type UserDocument = User & mongoose.Document;
