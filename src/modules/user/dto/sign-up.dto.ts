import * as Joi from 'joi';

export class SignUpDto {
  phoneNumber: string;
  password: string;
  email?: string;
  plates: string[];
}

export const SignUpDtoJoiSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required().min(6),
  // TODO FUTURE: try use joi.email
  email: Joi.string(),
  plates: Joi.array().items(Joi.string()),
});
