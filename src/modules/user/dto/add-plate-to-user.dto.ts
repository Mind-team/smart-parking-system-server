import * as Joi from 'joi';

export class AddPlateToUserDto {
  phoneNumber: string;
  password: string;
  plate: string;
}

export const AddPlateToUserDtoJoiSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required().min(6),
  plates: Joi.array().items(Joi.string()),
});
