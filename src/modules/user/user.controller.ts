import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInData } from '../../types/sign-in-data.type';
import { SignUpData } from '../../types/sign-up-data.type';
import { SignInDto } from '../../dtos/sign-in.dto';
import { SignUpDto } from '../../dtos/sign-up.dto';

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
  async addPlate(@Body() data: SignInData & { plate: string }) {
    return await this.userService.addPlateToUser(data);
  }
}
