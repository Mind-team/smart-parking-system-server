import { Body, Controller, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingRecord } from '../../interfaces/parking-record.interface';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('registerCarEntry')
  async registerCarEntry(
    @Body() data: Omit<ParkingRecord, 'departureCarTime' | 'priceRub'>,
  ) {
    return this.parkingService.registerCarEntry(data);
  }
}
