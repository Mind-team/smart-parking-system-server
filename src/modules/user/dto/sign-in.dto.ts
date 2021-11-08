import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
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
    minLength: 6,
  })
  password: string;
}
