import * as Joi from 'joi';

export class RegisterCarDepartureDto {
  parkingOwnerId: string;
  carPlate: string;
  departureCarTime: number;
}

export const RegisterCarDepartureDtoJoiSchema = Joi.object({
  parkingOwnerId: Joi.string().required(),
  carPlate: Joi.string().required(),
  departureCarTime: Joi.number().required(),
});
