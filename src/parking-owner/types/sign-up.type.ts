import { ParkingOwnerContent } from '../../models/interfaces/parking-owner-content.interface';

export type SignUp = Pick<
  ParkingOwnerContent,
  'title' | 'costCalculationFunction'
>;
