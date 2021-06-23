import { UserRecord } from '../../infrastructure/records/user-record.infrastructure';

export type SignInData = Pick<UserRecord, 'phoneNumber' | 'password'>;
