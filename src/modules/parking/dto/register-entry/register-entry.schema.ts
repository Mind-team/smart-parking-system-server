import * as Joi from 'joi';

export const RegisterEntryJoiSchema = Joi.object({
  parkingId: Joi.string().required(),
  transportPlate: Joi.string().required(),
});
