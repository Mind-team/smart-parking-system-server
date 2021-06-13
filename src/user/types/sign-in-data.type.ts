import { UserRecord } from '../../infrastructure/records/user-record.interface';

export type SignInData = Pick<UserRecord, 'phoneNumber' | 'password'>;
