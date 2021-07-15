import { RegisteredUserRecord } from '../../infrastructure/records/registered-user-record.infrastructure';

export type SignUpData = Omit<RegisteredUserRecord, 'parkings'>;
