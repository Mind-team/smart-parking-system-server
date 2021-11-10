import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

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

export const SignUpDtoJoiSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required().min(6),
  email: Joi.string(),
  plates: Joi.array().items(Joi.string()),
});
