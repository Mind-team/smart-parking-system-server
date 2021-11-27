import { Body, Controller, Post, UsePipes, Version } from '@nestjs/common';
import { ParkingService } from './parking.service';
import {
  RegisterCarEntryDto,
  RegisterCarEntryDtoJoiSchema,
} from './dto/register-car-entry.dto';
import {
  RegisterCarDepartureDto,
  RegisterCarDepartureDtoJoiSchema,
} from './dto/register-car-departure.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';

@ApiTags('Parking')
@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Version('3')
  @Post('registerCarEntry')
  @UsePipes(new JoiValidationPipe(RegisterCarEntryDtoJoiSchema))
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

  @Version('3')
  @Post('registerCarDeparture')
  @UsePipes(new JoiValidationPipe(RegisterCarDepartureDtoJoiSchema))
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
