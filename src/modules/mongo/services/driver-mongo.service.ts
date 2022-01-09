import { Injectable } from '@nestjs/common';
import { CollectionMongoBaseService } from '../abstractions/collection-mongo-base.abstract';
import { MongoDriver } from '../schemas/driver.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../enums/token.enum';
import { Model } from 'mongoose';

@Injectable()
export class DriverMongoService extends CollectionMongoBaseService<MongoDriver> {
  constructor(
    @InjectModel(Token.Driver)
    model: Model<MongoDriver>,
  ) {
    super(model);
  }
}
