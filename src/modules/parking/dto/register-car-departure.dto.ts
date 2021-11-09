import { ApiProperty } from '@nestjs/swagger';

export class RegisterCarDepartureDto {
  @ApiProperty({
    type: String,
    description: 'Parking owner id',
    required: true,
  })
  parkingOwnerId: string;

  @ApiProperty({
    type: String,
    description: 'Car plate',
    required: true,
  })
  carPlate: string;

  @ApiProperty({
    type: Number,
    description: 'Departure car time',
    required: true,
  })
  departureCarTime: number;
}
