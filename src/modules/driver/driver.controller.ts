import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import {
  RegisterDriverDto,
  RegisterDriverJoiSchema,
} from './dto/register-driver';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';

@Controller('driver')
export class DriverController {
  @Post('registration')
  @UsePipes(new JoiValidationPipe(RegisterDriverJoiSchema))
  async registerDriver(@Body() data: RegisterDriverDto) {
    return undefined;
  }
}
