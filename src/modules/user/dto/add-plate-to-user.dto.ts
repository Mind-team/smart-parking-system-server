import { ApiProperty } from '@nestjs/swagger';

export class AddPlateToUserDto {
  @ApiProperty({
    type: String,
    description: 'User phone number',
    required: true,
  })
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    required: true,
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Plate to add to the user',
    required: true,
  })
  plate: string;
}
