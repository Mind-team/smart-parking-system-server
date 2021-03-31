import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() user: User) {
    return await this.userService.register(user);
  }

  @Post('addPlate')
  async addPlate(@Body() inr: { phoneNumber: string; plate: string }) {
    console.log('1');
    return await this.userService.addPlateToUser(inr.phoneNumber, inr.plate);
  }
}
