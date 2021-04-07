import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRecord } from '../../interfaces/user-record.interface';
import { SignInData } from '../../types/sign-in-data.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signIn')
  async signInUser(@Body() data: SignInData) {
    return await this.userService.signIn(data);
  }

  @Post('signUp')
  async signUp(@Body() user: UserRecord) {
    return await this.userService.signUp(user);
  }

  @Post('addPlate')
  async addPlate(
    @Body() data: Pick<UserRecord, 'phoneNumber'> & { plate: string },
  ) {
    return await this.userService.addPlateToUser({ ...data });
  }
}
