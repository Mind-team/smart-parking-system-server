import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, unique: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  refreshToken: string;
}

export type DriverDocument = MongoDriver & mongoose.Document;
export const DriverSchema = SchemaFactory.createForClass(MongoDriver);
