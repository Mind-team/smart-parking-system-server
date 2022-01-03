import * as Joi from 'joi';

export const RegisterParkingOwnerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required().min(6),
});
