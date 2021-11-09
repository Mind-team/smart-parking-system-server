import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
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
    description: 'User email',
    required: false,
  })
  // TODO FUTURE: try use joi.email
  email?: string;

  @ApiProperty({
    type: String,
    description: 'User vehicle plates',
    required: true,
  })
  plates: string[];
}
