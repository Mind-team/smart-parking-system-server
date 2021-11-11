import * as Joi from 'joi';

export class RegisterCarEntryDto {
  parkingOwnerId: string;
  carPlate: string;
  entryCarTime: string;
}

export const RegisterCarEntryDtoJoiSchema = Joi.object({
  parkingOwnerId: Joi.string().required(),
  carPlate: Joi.string().required(),
  departureCarTime: Joi.number().required(),
});
