import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisteredUserDocument } from './schemas/registered-user.schema';
import { Model } from 'mongoose';
import { Collection } from '../../infrastructure/collection.infrastructure';
import { RegisteredUserContent } from '../../models/interfaces/registered-user-content.interface';

@Injectable()
export class RegisteredUsersMongoService
  implements Collection<RegisteredUserContent>
{
  readonly #registeredUserModel: Model<RegisteredUserDocument>;
  constructor(
    @InjectModel('RegisteredUser')
    registeredUserModel: Model<RegisteredUserDocument>,
  ) {
    this.#registeredUserModel = registeredUserModel;
  }

  findById = async (id: string): Promise<RegisteredUserContent> =>
    this.findOne({ _id: id });

  findOne = async (filter: {
    [key: string]: any;
  }): Promise<RegisteredUserContent> =>
    this.#registeredUserModel.findOne(filter);

  save: any;

  updateOne: any;
  deleteOne: any;
}
