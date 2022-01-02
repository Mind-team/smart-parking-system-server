import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IParkingOwnerData } from '../../../core/parking-owner';

@Schema()
export class MongoParkingOwner implements IParkingOwnerData {
  @Prop({ type: String, required: true, unique: true })
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String], required: true, default: [] })
  parkingsIds: string[];
}

export type ParkingOwnerDocument = MongoParkingOwner & mongoose.Document;
export const ParkingOwnerSchema =
  SchemaFactory.createForClass(MongoParkingOwner);
