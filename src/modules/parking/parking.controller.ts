import { Body, Controller, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { RegisterCarEntryDto } from './dto/register-car-entry.dto';
import { RegisterCarDepartureDto } from './dto/register-car-departure.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Parking')
@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('registerCarEntry')
  @ApiCreatedResponse({
    description: 'A record that the transport has stopped by has been created',
  })
  @ApiBadRequestResponse({ description: 'Internal error' })
  async registerCarEntry(@Body() data: RegisterCarEntryDto) {
    return this.parkingService.registerCarEntry({
      ...data,
      entryCarTime: new Date(data.entryCarTime),
    });
  }

  @Post('registerCarDeparture')
  @ApiCreatedResponse({
    description: 'A record that the transport has left has been created',
  })
  @ApiBadRequestResponse({ description: 'Internal error' })
  async registerCarDeparture(@Body() data: RegisterCarDepartureDto) {
    return this.parkingService.registerCarDeparture({
      ...data,
      departureCarTime: new Date(data.departureCarTime),
    });
  }
}
