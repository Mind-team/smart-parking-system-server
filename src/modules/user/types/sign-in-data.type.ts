import { RegisteredUserRecord } from '../../../infrastructure/records/registered-user-record.infrastructure';

export type SignInData = Pick<RegisteredUserRecord, 'phoneNumber' | 'password'>;
