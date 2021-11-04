import * as mongoose from 'mongoose';
import { ParkingOwnerRecord } from '../../../infrastructure/records/parking-owner-record.infrastructure';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ParkingOwner implements ParkingOwnerRecord {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  costCalculationFunction: string;

  @Prop({ type: mongoose.Schema.Types.String })
  title: string;
}

export type ParkingOwnerDocument = ParkingOwnerRecord & mongoose.Document;
export const ParkingOwnerSchema = SchemaFactory.createForClass(ParkingOwner);
