import { Injectable } from '@nestjs/common';
import { Collection } from '../../infrastructure/collection.infrastructure';
import { UnregisteredUserContent } from '../../models/interfaces/unregistered-user-content.interface';
import { UnregisteredUserDocument } from './schemas/unregistered-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UnregisteredUsersMongoService
  implements Collection<UnregisteredUserContent>
{
  readonly #unregisteredUserModel: Model<UnregisteredUserDocument>;

  constructor(unregisteredUserModel: Model<UnregisteredUserDocument>) {
    this.#unregisteredUserModel = unregisteredUserModel;
  }

  findById = async (id: string): Promise<UnregisteredUserContent> =>
    this.findOne({ _id: id });

  findOne = async (filter: {
    [key: string]: any;
  }): Promise<UnregisteredUserContent> =>
    this.#unregisteredUserModel.findOne(filter);

  save: any;

  updateOne: any;
  deleteOne: any;
}
