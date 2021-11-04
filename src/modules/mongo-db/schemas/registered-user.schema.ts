import * as mongoose from 'mongoose';
import { RegisteredUserRecord } from '../../../infrastructure/records/registered-user-record.infrastructure';
import { ParkingRecordSchema } from './parking-record.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ParkingRecord } from '../../../infrastructure/records/parking-record.infrastructure';

@Schema()
export class RegisteredUser implements RegisteredUserRecord {
  @Prop({ require: true, type: mongoose.Schema.Types.String })
  phoneNumber: string;

  @Prop({ require: true, type: mongoose.Schema.Types.String, minlength: 6 })
  password: string;

  @Prop({ type: mongoose.Schema.Types.String, unique: false, sparse: true })
  email?: string;

  @Prop([
    {
      type: mongoose.Schema.Types.String,
      require: true,
      unique: true,
      sparse: true,
    },
  ])
  plates: string[];

  @Prop([{ type: ParkingRecordSchema }])
  parkings: ParkingRecord[];
}

export type RegisteredUserDocument = RegisteredUserRecord & mongoose.Document;
export const RegisteredUserSchema =
  SchemaFactory.createForClass(RegisteredUser);
