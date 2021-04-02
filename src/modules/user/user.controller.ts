import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../interfaces/user.interface';
import { AddPlateToUserDto } from '../../dtos/add-plate-to-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Query() { phoneNumber }: { phoneNumber: string }) {
    return this.userService.getUser(`+${phoneNumber}`);
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
