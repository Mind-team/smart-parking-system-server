import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  Version,
} from '@nestjs/common';
import {
  RegisterDriverRequestDto,
  RegisterDriverJoiSchema,
} from './dto/register-driver';
import { JoiValidationPipe } from '../../pipes';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { RegisterDriverResponseDto } from './dto/register-driver/register-driver-response.dto';
import { JwtAuthGuard } from '../auth';
import { FromJwtDto } from '../auth/dto/from-jwt.dto';

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
  async registerDriver(
    @Body() data: RegisterDriverRequestDto,
  ): Promise<RegisterDriverResponseDto> {
    return this.service.registerDriver(data);
  }

  @Version('4')
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение данных водителя' })
  @ApiOkResponse({ description: 'Данные водителя отправлены' })
  @ApiBadRequestResponse({ description: 'Данные водителя не отправлены' })
  async getDriver(@Body() data: FromJwtDto) {
    return this.service.driverData(data.decodedJwt);
  }
}
