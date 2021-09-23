import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AddPlateToUserDto } from './dto/add-plate-to-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signIn')
  async signInUser(@Body() { phoneNumber, password }: SignInDto) {
    return await this.userService.signIn({
      phoneNumber,
      password,
    });
  }

  @Post('signUp')
  async signUp(@Body() { phoneNumber, password, email, plates }: SignUpDto) {
    return await this.userService.signUp({
      phoneNumber,
      password,
      email,
      plates,
    });
  }

  @Post('addPlate')
  async addPlate(@Body() { phoneNumber, password, plate }: AddPlateToUserDto) {
    return await this.userService.addPlateToUser({
      phoneNumber,
      password,
      plate,
    });
  }

  @Post('lastParkingHistoryElement')
  async lastParkingHistoryElement(
    @Body() { phoneNumber, password }: SignInDto,
  ) {
    return await this.userService.lastParkingHistoryElement({
      phoneNumber,
      password,
    });
  }
}
