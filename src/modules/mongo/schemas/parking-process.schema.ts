import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MongoParkingProcess {
  @Prop({ type: String, required: true, unique: true })
  _id: string;

  @Prop({ type: String, required: true })
  parkingId: string;

  @Prop({
    type: {
      _id: { type: String, required: true },
      carPlate: { type: String, required: true },
    },
    required: true,
  })
  driver: {
    _id: string;
    carPlate: string;
  };

  @Prop({ type: String, required: true })
  entryCarTime: string;

  @Prop({ type: String, required: false })
  departureCarTime?: string;

  @Prop({ type: Boolean, required: true, default: false })
  isCompleted: boolean;
}

export type ParkingProcessDocument = MongoParkingProcess & mongoose.Document;
export const ParkingProcessSchema =
  SchemaFactory.createForClass(MongoParkingProcess);
