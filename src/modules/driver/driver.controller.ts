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
  RegisterDriverResponseDto,
  GetDriverResponseDto,
  RefreshTokensRequestDto,
  RefreshTokensResponseDto,
  GetParkingProcessesResponseDto,
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
    type: RegisterDriverResponseDto,
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
  @ApiOkResponse({
    description: 'Данные водителя отправлены',
    type: GetDriverResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Данные водителя не отправлены' })
  async getDriver(@Body() data: FromJwtDto): Promise<GetDriverResponseDto> {
    return this.service.driverData(data.decodedJwt);
  }

  @Version('4')
  @Post('refresh')
  @ApiOperation({ summary: 'Обновление токена' })
  @ApiCreatedResponse({
    description: 'Токены обновлены и отправлены',
    type: RefreshTokensResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Пришел невалидный токен' })
  async refreshToken(
    @Body() data: RefreshTokensRequestDto,
  ): Promise<RefreshTokensResponseDto> {
    return await this.service.refreshToken(data.refreshToken);
  }

  @Version('4')
  @Get('pp')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение парковочных процессов водителя' })
  @ApiOkResponse({
    description: 'Парковочные процессы водителя отправлены',
    type: GetParkingProcessesResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Парковочные процессы водителя не отправлены',
  })
  @ApiQuery({ name: 'driverId', type: 'string' })
  async parkingProcesses(
    @Query('driverId') driverId,
  ): Promise<GetParkingProcessesResponseDto[]> {
    return await this.service.parkingProcesses({ driverId });
  }
}
