import { Body, Controller, Post, UsePipes, Version } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParkingService } from './parking.service';
import { JoiValidationPipe } from '../../pipes';
import {
  CreateParkingJoiSchema,
  CreateParkingDto,
  RegisterEntryJoiSchema,
  RegisterEntryDto,
} from './dto';

@ApiTags('parking')
@Controller('parking')
export class ParkingController {
  constructor(private readonly service: ParkingService) {}

  @Version('4')
  @Post('create')
  @UsePipes(new JoiValidationPipe(CreateParkingJoiSchema))
  @ApiOperation({ summary: 'Создание парковки' })
  @ApiCreatedResponse({
    description: 'Парковка создана',
  })
  @ApiBadRequestResponse({ description: 'Парковка не создана' })
  async createParking(@Body() data: CreateParkingDto) {
    await this.service.createParking(data);
  }

  @Version('4')
  @Post('register-entry')
  @UsePipes(new JoiValidationPipe(RegisterEntryJoiSchema))
  @ApiOperation({ summary: 'Регистрация въезда транспортного средства' })
  @ApiOkResponse({ description: 'Успешная регистрация' })
  @ApiInternalServerErrorResponse({
    description: 'Въезд т.с. не был зарегистрирован',
  })
  async registerTransportEntry(@Body() data: RegisterEntryDto) {
    await this.service.registerTransportEntry(data);
  }
}
