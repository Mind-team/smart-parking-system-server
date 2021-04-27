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
  async signInUser(@Body() data: SignInDto) {
    return await this.userService.signIn({
      phoneNumber: { value: data.phoneNumber },
      password: data.password,
    });
  }

  @Post('signUp')
  async signUp(@Body() data: SignUpDto) {
    return await this.userService.signUp({
      phoneNumber: { value: data.phoneNumber },
      password: data.password,
      email: data.email,
      plates: data.plates.map((el) => {
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
