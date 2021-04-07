import { User } from '../interfaces/user.interface';

export type SignInData = Pick<User, 'phoneNumber' | 'password'>;
