import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

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

export const SignInDtoJoiSchema = Joi.object({
  // TODO: user regexp (joi: pattern)
  phoneNumber: Joi.string().required(),
  password: Joi.string().required().min(6),
});
