import { Body, Controller, Get, Post, UsePipes, Version } from '@nestjs/common';
import {
  RegisterDriverDto,
  RegisterDriverJoiSchema,
} from './dto/register-driver';
import { JoiValidationPipe } from '../../pipes';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DriverService } from './driver.service';

@ApiTags('driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly service: DriverService) {}

  @Version('4')
  @Post('registration')
  @UsePipes(new JoiValidationPipe(RegisterDriverJoiSchema))
  @ApiOperation({ summary: 'Регистрация водителя' })
  @ApiCreatedResponse({
    description: 'Водитель заргистрирован',
  })
  @ApiBadRequestResponse({ description: 'Водитель не зарегистрирован' })
  async registerDriver(@Body() data: RegisterDriverDto) {
    await this.service.registerDriver(data);
  }

  // @Version('4')
  // @Get()
  // @ApiOperation({ summary: 'Получение данных водителя' })
  // async getDriver() {
  //
  // }
}
