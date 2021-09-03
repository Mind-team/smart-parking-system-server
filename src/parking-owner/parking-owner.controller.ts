import { Body, Controller, Post } from '@nestjs/common';
import { SignUpParkingOwnerDto } from './dto/sign-up-parking-owner.dto';
import { ParkingOwnerService } from './parking-owner.service';

@Controller('parkingOwner')
export class ParkingOwnerController {
  constructor(private readonly parkingOwnerService: ParkingOwnerService) {}

  @Post('signUp')
  async signUp(
    @Body() { title, costCalculationFunction }: SignUpParkingOwnerDto,
  ) {
    return await this.parkingOwnerService.signUp({
      title,
      costCalculationFunction,
    });
  }
}
