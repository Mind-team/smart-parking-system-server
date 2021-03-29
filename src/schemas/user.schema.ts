import * as mongoose from 'mongoose';
import { User } from '../interfaces/user.interface';

export const UserSchema = new mongoose.Schema<mongoose.Document<User>>({
  phoneNumber: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  email: { type: String, unique: false, sparse: true },
  plates: { type: Array, unique: true, sparse: true },
});

export type UserDocument = User & mongoose.Document;
