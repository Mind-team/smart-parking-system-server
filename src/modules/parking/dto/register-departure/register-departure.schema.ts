import * as Joi from 'joi';

export const RegisterDepartureJoiSchema = Joi.object({
  transportPlate: Joi.string().required(),
});
