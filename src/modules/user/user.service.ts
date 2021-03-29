import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { User } from '../../interfaces/user.interface';
import { ServerResponse } from '../../models/server-response.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async register(userData: User) {
    try {
      await new this.userModel({ ...userData }).save();
      return new ServerResponse('Success');
    } catch (e) {
      return new ServerResponse('Failed', e.message);
    }
  }
}
