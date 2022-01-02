import * as Joi from 'joi';

export const RegisterDriverJoiSchema = Joi.object({
  phoneNumber: Joi.string()
    .required()
    .length(12)
    .pattern(
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
    ),
  password: Joi.string().required().min(6),
  email: Joi.string(),
  carPlates: Joi.array().items(Joi.string()),
});
