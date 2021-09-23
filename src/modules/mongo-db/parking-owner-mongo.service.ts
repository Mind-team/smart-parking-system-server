import { Injectable } from '@nestjs/common';
import { Collection } from '../../infrastructure/collection.infrastructure';
import { ParkingOwnerContent } from '../../models/interfaces/parking-owner-content.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ParkingOwnerDocument } from './schemas/parking-owner.schema';

@Injectable()
export class ParkingOwnerMongoService
  implements Collection<ParkingOwnerContent>
{
  readonly #parkingOwnerModel: Model<ParkingOwnerDocument>;

  constructor(
    @InjectModel('parking-owner')
    parkingOwnerModel: Model<ParkingOwnerDocument>,
  ) {
    this.#parkingOwnerModel = parkingOwnerModel;
  }

  deleteOne = async (filter: { [p: string]: any }): Promise<void> => {
    this.#parkingOwnerModel.deleteOne(filter);
  };

  findById = async (id: string): Promise<ParkingOwnerContent> | null =>
    this.findOne({ _id: id });

  findOne = async (filter: {
    [p: string]: any;
  }): Promise<ParkingOwnerContent> | null =>
    this.#parkingOwnerModel.findOne(filter);

  save = async (content: ParkingOwnerContent): Promise<void> => {
    await new this.#parkingOwnerModel(content).save();
  };

  updateOne = async (
    filter: { [p: string]: any },
    update: ParkingOwnerContent,
  ): Promise<void> => {
    await this.#parkingOwnerModel.updateOne(filter, update);
  };
}
