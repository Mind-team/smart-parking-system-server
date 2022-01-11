import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DriverType } from '../../../core/driver';

@Schema()
export class MongoDriver {
  @Prop({ type: String, required: true, unique: true })
  _id: string;

  @Prop({ type: [String], required: true, unique: true })
  carPlates: string[];

  @Prop({ type: String, required: false, sparse: true })
  email?: string;

  @Prop({ type: [String], required: true, default: [] })
  parkingProcessIds: string[];

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, unique: true, sparse: true })
  phoneNumber: string;

  @Prop({ type: String })
  refreshToken: string;

  @Prop({ type: String, required: false })
  currentParkingProcessId: string | null;

  @Prop({ type: Number, required: true })
  type: DriverType;
}

export type DriverDocument = MongoDriver & mongoose.Document;
export const DriverSchema = SchemaFactory.createForClass(MongoDriver);
