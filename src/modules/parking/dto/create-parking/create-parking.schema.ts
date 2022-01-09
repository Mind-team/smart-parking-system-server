import * as Joi from 'joi';

export const CreateParkingJoiSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  ownerId: Joi.string().required(),
  parkingSpacesCount: Joi.number().required(),
});
