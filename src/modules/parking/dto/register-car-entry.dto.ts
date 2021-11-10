import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

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

export const RegisterCarEntryDtoJoiSchema = Joi.object({
  parkingOwnerId: Joi.string().required(),
  carPlate: Joi.string().required(),
  departureCarTime: Joi.number().required(),
});
