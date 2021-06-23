import { UserRecord } from '../../infrastructure/records/user-record.infrastructure';

export type SignUpData = Omit<UserRecord, 'parkingHistory'>;
