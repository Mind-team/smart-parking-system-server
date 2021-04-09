import { UserRecord } from '../interfaces/records/user-record.interface';

export type SignInData = Pick<UserRecord, 'phoneNumber' | 'password'>;
