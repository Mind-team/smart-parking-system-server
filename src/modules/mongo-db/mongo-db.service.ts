import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisteredUserDocument } from './schemas/registered-user.schema';
import { Model } from 'mongoose';
import { Collection } from '../../infrastructure/collection.infrastructure';
import { RegisteredUserContent } from '../../models/interfaces/registered-user-content.interface';

@Injectable()
export class MongoDbService implements Collection<RegisteredUserContent> {
  readonly #registeredUserModel: Model<RegisteredUserDocument>;
  constructor(
    @InjectModel('RegisteredUser')
    registeredUserModel: Model<RegisteredUserDocument>,
  ) {
    this.#registeredUserModel = registeredUserModel;
  }
  findById = async (id: string): Promise<RegisteredUserContent> => {
    return await this.findOne({ _id: id });
  };

  findOne = async (filter: {
    [key: string]: any;
  }): Promise<RegisteredUserContent> => {
    const { phoneNumber, password, email, plates, parkings } =
      await this.#registeredUserModel.findOne(filter);
    return {
      phoneNumber,
      password,
      email,
      plates,
      parkings: parkings.map((parking) => parking),
    };
  };

  save: any;

  updateOne: any;
}
