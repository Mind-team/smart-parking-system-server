import { IRegisteredDriverData } from './registered-driver-data.interface';
import { _IDriver } from '../driver.interface';

export type IRegisteredDriver = _IDriver<IRegisteredDriverData>;

// Сейчас сделал type, чтобы линтер не ругался на equal типа и супертипа
// export interface IRegisteredDriver extends IDriver<IRegisteredDriverData> {
//   updatePaymentMethod: () => void;
// }
