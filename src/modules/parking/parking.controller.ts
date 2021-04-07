import { Body, Controller, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { EntryCarParkingRecord } from '../../types/entry-car-parking-record.type';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('registerCarEntry')
  async registerCarEntry(@Body() data: EntryCarParkingRecord) {
    return this.parkingService.registerCarEntry(data);
  }
}
