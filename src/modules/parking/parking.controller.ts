import { Body, Controller, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { EntryCarParkingRecord } from '../../interfaces/parking-record.interface';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('registerCarEntry')
  async registerCarEntry(@Body() data: EntryCarParkingRecord) {
    return this.parkingService.registerCarEntry(data);
  }
}
