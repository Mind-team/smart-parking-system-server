import * as Joi from 'joi';

export const SendConfirmationCodeJoiSchema = Joi.object({
  phoneNumber: Joi.string()
    .required()
    .length(12)
    .pattern(
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
    ),
});
