import { Injectable } from '@nestjs/common';
import { Collection } from '../../infrastructure/collection.infrastructure';
import { UnregisteredUserContent } from '../../models/interfaces/unregistered-user-content.interface';
import { UnregisteredUserDocument } from './schemas/unregistered-user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UnregisteredUsersMongoService
  implements Collection<UnregisteredUserContent>
{
  readonly #unregisteredUserModel: Model<UnregisteredUserDocument>;

  constructor(
    @InjectModel('UnregisteredUser')
    unregisteredUserModel: Model<UnregisteredUserDocument>,
  ) {
    this.#unregisteredUserModel = unregisteredUserModel;
  }

  findById = async (id: string): Promise<UnregisteredUserContent> | null =>
    this.findOne({ _id: id });

  findOne = async (filter: {
    [key: string]: any;
  }): Promise<UnregisteredUserContent> | null =>
    this.#unregisteredUserModel.findOne(filter);

  save = async (newContent: UnregisteredUserContent): Promise<void> => {
    await new this.#unregisteredUserModel(newContent).save();
  };

  updateOne = async (
    filter: { [key: string]: any },
    updatedContent: UnregisteredUserContent,
  ) => {
    await this.#unregisteredUserModel.updateOne(filter, updatedContent);
  };

  deleteOne = async (filter: { [key: string]: any }) => {
    this.#unregisteredUserModel.deleteOne(filter);
  };
}
