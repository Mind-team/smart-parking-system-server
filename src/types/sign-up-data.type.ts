import { UserRecord } from '../interfaces/records/user-record.interface';

export type SignUpData = Omit<UserRecord, 'parkingHistory'>;
