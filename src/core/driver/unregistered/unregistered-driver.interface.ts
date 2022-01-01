import { IUnregisteredDriverData } from './unregistered-driver-data.interface';
import { _IDriver } from '../driver.interface';

export type IUnregisteredDriver = _IDriver<IUnregisteredDriverData>;

// Сейчас сделал type, чтобы линтер не ругался на equal типа и супертипа
// export interface IUnregisteredDriver extends IDriver<IUnregisteredDriverData> {
//   //register: (data) => void;
// }
