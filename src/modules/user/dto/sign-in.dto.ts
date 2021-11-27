import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class SignInDto {
  @ApiProperty({
    examples: ['89555605005', '+79555605002'],
  })
  phoneNumber: string;

  @ApiProperty({
    type: String,
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
