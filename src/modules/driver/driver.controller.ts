import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  Version,
} from '@nestjs/common';
import {
  RegisterDriverRequestDto,
  RegisterDriverJoiSchema,
  LoginDriverResponseDto,
  RegisterDriverResponseDto,
  LoginDriverRequestDto,
  LoginDriverJoiSchema,
  SendConfirmationCodeRequestDto,
  SendConfirmationCodeJoiSchema,
} from './dto';
import { JoiValidationPipe } from '../../pipes';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { JwtAuthGuard, FromJwtDto } from '../auth';

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
  @Post('login')
  @UsePipes(new JoiValidationPipe(LoginDriverJoiSchema))
  @ApiOperation({ summary: 'Логин пользователя' })
  @ApiCreatedResponse({
    description: 'Все удачно, выдали токены',
    type: LoginDriverResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Ошибочка' })
  async loginDriver(
    @Body() data: LoginDriverRequestDto,
  ): Promise<LoginDriverResponseDto> {
    return this.service.loginDriver(data.phoneNumber, data.confirmationCode);
  }

  @Version('4')
  @Post('send-confirmation-code')
  @UsePipes(new JoiValidationPipe(SendConfirmationCodeJoiSchema))
  async sendCode(@Body() data: SendConfirmationCodeRequestDto) {
    this.service.sendConfirmationSMSCode(data.phoneNumber);
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

  @Version('4')
  @Post('refresh')
  @ApiOperation({ summary: 'Обновление токена' })
  @ApiBadRequestResponse({ description: 'Пришел невалидный токен' })
  async refreshToken(@Body() data: { refreshToken: string }) {
    return await this.service.refreshToken(data.refreshToken);
  }

  @Version('4')
  @Get('pp')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение парковочных процессов водителя' })
  @ApiOkResponse({ description: 'Парковочные процессы водителя отправлены' })
  @ApiBadRequestResponse({
    description: 'Парковочные процессы водителя не отправлены',
  })
  @ApiQuery({ name: 'driverId', type: 'string' })
  async parkingProcesses(@Query('driverId') driverId) {
    return await this.service.parkingProcesses({ driverId });
  }
}
