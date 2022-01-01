import * as Joi from 'joi';

export const RegisterDriverJoiSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required().min(6),
  email: Joi.string(),
  carPlates: Joi.array().items(Joi.string()),
});
