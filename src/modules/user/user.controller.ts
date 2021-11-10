import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto, SignInDtoJoiSchema } from './dto/sign-in.dto';
import { SignUpDto, SignUpDtoJoiSchema } from './dto/sign-up.dto';
import {
  AddPlateToUserDto,
  AddPlateToUserDtoJoiSchema,
} from './dto/add-plate-to-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signIn')
  @UsePipes(new JoiValidationPipe(SignInDtoJoiSchema))
  @ApiOkResponse({ description: 'User has successfully logged in' })
  @ApiBadRequestResponse({ description: 'Incorrect phone number or password' })
  async signInUser(@Body() { phoneNumber, password }: SignInDto) {
    return await this.userService.signIn({
      phoneNumber,
      password,
    });
  }

  @Post('signUp')
  @UsePipes(new JoiValidationPipe(SignUpDtoJoiSchema))
  @ApiCreatedResponse({
    description: 'New user has been created (in registered users collection)',
  })
  @ApiBadRequestResponse({ description: 'Incorrect entered data' })
  async signUp(@Body() { phoneNumber, password, email, plates }: SignUpDto) {
    return await this.userService.signUp({
      phoneNumber,
      password,
      email,
      plates,
    });
  }

  @Post('addPlate')
  @UsePipes(new JoiValidationPipe(AddPlateToUserDtoJoiSchema))
  @ApiOkResponse({ description: 'Plate was successfully added to the user' })
  @ApiBadRequestResponse({ description: 'Plate is already in use' })
  async addPlate(@Body() { phoneNumber, password, plate }: AddPlateToUserDto) {
    return await this.userService.addPlateToUser({
      phoneNumber,
      password,
      plate,
    });
  }

  @Post('lastParkingHistoryElement')
  @UsePipes(new JoiValidationPipe(SignInDtoJoiSchema))
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Something went wrong' })
  async lastParkingHistoryElement(
    @Body() { phoneNumber, password }: SignInDto,
  ) {
    return await this.userService.lastParkingHistoryElement({
      phoneNumber,
      password,
    });
  }
}
