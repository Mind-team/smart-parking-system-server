import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../interfaces/user.interface';
import { AddPlateToUserDto } from '../../dtos/add-plate-to-user.dto';
import { SignInUserDto } from '../../dtos/sign-in-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signIn')
  async signInUser(@Body() data: SignInUserDto) {
    return await this.userService.signIn(data);
  }

  @Post('register')
  async registerUser(@Body() user: User) {
    return await this.userService.register(user);
  }

  @Post('addPlate')
  async addPlate(@Body() data: AddPlateToUserDto) {
    return await this.userService.addPlateToUser({ ...data });
  }
}
