import { UnregisteredUserRecord } from './unregistered-user-record.infrastructure';

export interface UserRecord extends UnregisteredUserRecord {
  phoneNumber: string;
  password: string;
  email?: string;
}
