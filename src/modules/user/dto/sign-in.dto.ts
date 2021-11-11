import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  phoneNumber: string;

  @ApiProperty({
    type: String,
    required: true,
    minLength: 6,
  })
  password: string;
}
