import { Body, Controller, Post, UsePipes, Version } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParkingOwnerService } from './parking-owner.service';
import { JoiValidationPipe } from '../../pipes';
import {
  RegisterParkingOwnerSchema,
  RegisterParkingOwnerRequestDto,
} from './dto';

@ApiTags('parking-owner')
@Controller('parking-owner')
export class ParkingOwnerController {
  constructor(private readonly service: ParkingOwnerService) {}

  @Version('4')
  @Post('registration')
  @UsePipes(new JoiValidationPipe(RegisterParkingOwnerSchema))
  @ApiOperation({ summary: 'Регистрация владельца паркинга' })
  @ApiCreatedResponse({
    description: 'Владелец паркинга заргистрирован',
  })
  @ApiInternalServerErrorResponse({
    description: 'Владелец паркинга не зарегистрирован',
  })
  async registerParkingOwner(@Body() data: RegisterParkingOwnerRequestDto) {
    await this.service.registerParkingOwner(data);
  }
}
