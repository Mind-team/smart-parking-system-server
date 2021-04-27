import { Body, Controller, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { RegisterCarEntryDto } from '../../dtos/register-car-entry.dto';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('registerCarEntry')
  async registerCarEntry(@Body() data: RegisterCarEntryDto) {
    return this.parkingService.registerCarEntry(data);
  }
}
