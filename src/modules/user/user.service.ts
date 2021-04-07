import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { User } from '../../interfaces/user.interface';
import { AddPlateToUserDto } from '../../dtos/add-plate-to-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from '../../dtos/sign-in-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async signIn(userData: SignInUserDto) {
    try {
      const [phoneNumber, password] = [userData.phoneNumber, userData.password];
      const candidate = await this.userModel.findOne({ phoneNumber });
      if (!candidate) {
        return new HttpException(
          `User with ${phoneNumber} phone number does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return (await bcrypt.compare(password, candidate.password))
        ? candidate
        : new HttpException('Passwords do not match', HttpStatus.UNAUTHORIZED);
    } catch (e) {
      throw new HttpException('Something is wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async register(userData: User) {
    try {
      userData.password = await bcrypt.hash(
        userData.password,
        await bcrypt.genSalt(),
      );
      await new this.userModel({ ...userData }).save();
      return HttpStatus.CREATED;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addPlateToUser({ phoneNumber, plate }: AddPlateToUserDto) {
    // TODO: Валидация пользователя
    // TODO: Валидация номера введенного
    try {
      const document = await this.userModel.updateOne(
        { phoneNumber },
        { $push: { plates: plate } },
      );
      return document.nModified === 0
        ? new HttpException(
            `User with ${phoneNumber} phone number does not exist`,
            HttpStatus.BAD_REQUEST,
          )
        : HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
