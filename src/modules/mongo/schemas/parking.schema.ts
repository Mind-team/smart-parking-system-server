import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IParkingData } from '../../../core/parking';

@Schema()
export class MongoParking implements IParkingData {
  @Prop({ type: String, required: true, unique: true })
  _id: string;

  @Prop({ type: String, required: true })
  ownerId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: [String], required: true })
  parkingProcessesIds: string[];

  @Prop({ type: Number, required: true })
  parkingSpacesCount: number;
}

export type ParkingDocument = MongoParking & mongoose.Document;
export const ParkingSchema = SchemaFactory.createForClass(MongoParking);
