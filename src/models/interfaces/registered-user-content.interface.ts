import { UnregisteredUserContent } from './unregistered-user-content.interface';

export interface RegisteredUserContent extends UnregisteredUserContent {
  phoneNumber: string;
  password: string;
  email?: string;
}
