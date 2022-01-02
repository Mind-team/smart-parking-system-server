import { Injectable } from '@nestjs/common';
import { CollectionMongoBaseService } from '../abstractions/collection-mongo-base.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../enums/token.enum';
import { Model } from 'mongoose';
import { MongoParkingOwner } from '../schemas/parking-owner.schema';

@Injectable()
export class ParkingOwnerMongoService extends CollectionMongoBaseService<MongoParkingOwner> {
  constructor(
    @InjectModel(Token.Parking)
    model: Model<MongoParkingOwner>,
  ) {
    super(model);
  }
}
