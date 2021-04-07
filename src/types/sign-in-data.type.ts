import { UserRecord } from '../interfaces/user-record.interface';

export type SignInData = Pick<UserRecord, 'phoneNumber' | 'password'>;
