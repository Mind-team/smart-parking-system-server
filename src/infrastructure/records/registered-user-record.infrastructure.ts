import { UnregisteredUserRecord } from './unregistered-user-record.infrastructure';

export interface RegisteredUserRecord extends UnregisteredUserRecord {
  phoneNumber: string;
  password: string;
  email?: string;
}
