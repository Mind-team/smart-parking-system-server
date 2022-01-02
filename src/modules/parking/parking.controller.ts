import { Body, Controller, Post, UsePipes, Version } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParkingService } from './parking.service';
import { JoiValidationPipe } from '../../pipes';
import { CreateParkingJoiSchema } from './dto/create-parking/create-parking.schema';
import { CreateParkingDto } from './dto/create-parking/create-parking.dto';

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
}
