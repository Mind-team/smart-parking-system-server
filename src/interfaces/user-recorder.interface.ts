import { UserRecord } from './user-record.interface';

export interface UserRecorder {
  formatForDB: () => Promise<UserRecord>;
}
