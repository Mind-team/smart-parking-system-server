import { UserRecord } from '../interfaces/user.interface';

export type SignInData = Pick<UserRecord, 'phoneNumber' | 'password'>;
