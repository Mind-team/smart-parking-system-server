import { UserRecord } from '../../infrastructure/records/user-record.interface';

export type SignUpData = Omit<UserRecord, 'parkingHistory'>;
