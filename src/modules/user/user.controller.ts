import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInData } from '../../types/sign-in-data.type';
import { SignInDto } from '../../dtos/sign-in.dto';
import { SignUpDto } from '../../dtos/sign-up.dto';
import { AddPlateToUserDto } from '../../dtos/add-plate-to-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signIn')
  async signInUser(@Body() { phoneNumber, password }: SignInDto) {
    return await this.userService.signIn({
      phoneNumber: { value: phoneNumber },
      password,
    });
  }

  @Post('signUp')
  async signUp(@Body() { phoneNumber, password, email, plates }: SignUpDto) {
    return await this.userService.signUp({
      phoneNumber: { value: phoneNumber },
      password,
      email,
      plates: plates.map((el) => {
        return { value: el };
      }),
    });
  }

  @Post('addPlate')
  async addPlate(@Body() { phoneNumber, password, plate }: AddPlateToUserDto) {
    return await this.userService.addPlateToUser({
      phoneNumber: {
        value: phoneNumber,
      },
      password,
      plate,
    });
  }
}
