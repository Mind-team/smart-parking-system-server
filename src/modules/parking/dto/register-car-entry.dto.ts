import { ApiProperty } from '@nestjs/swagger';

export class RegisterCarEntryDto {
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
    type: String,
    description: 'Entry car time',
    required: true,
  })
  entryCarTime: string;
}
