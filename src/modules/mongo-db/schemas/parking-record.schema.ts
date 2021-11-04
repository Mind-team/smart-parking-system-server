import * as mongoose from 'mongoose';
import { ParkingRecord } from '../../../infrastructure/records/parking-record.infrastructure';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ParkingRecordN implements ParkingRecord {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  parkingOwnerId: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  parkingTitle: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  carPlate: string;

  @Prop({ type: mongoose.Schema.Types.Date, required: true })
  entryCarTime: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  departureCarTime: Date;

  @Prop({ type: mongoose.Schema.Types.Number })
  priceRub: number;

  @Prop({ type: mongoose.Schema.Types.Boolean, required: true })
  isCompleted: boolean;
}

export const ParkingRecordSchema = SchemaFactory.createForClass(ParkingRecordN);
