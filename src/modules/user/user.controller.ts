import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../interfaces/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() user: User) {
    return await this.userService.register(user);
  }
}
