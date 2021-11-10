import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

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

export const AddPlateToUserDtoJoiSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required().min(6),
  plates: Joi.array().items(Joi.string()),
});
