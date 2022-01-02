import { Injectable } from '@nestjs/common';
import { CollectionMongoBaseService } from '../abstractions/collection-mongo-base.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../enums/token.enum';
import { Model } from 'mongoose';
import { MongoParking } from '../schemas/parking.schema';

@Injectable()
export class ParkingMongoService extends CollectionMongoBaseService<MongoParking> {
  constructor(
    @InjectModel(Token.Parking)
    model: Model<MongoParking>,
  ) {
    super(model);
  }
}
