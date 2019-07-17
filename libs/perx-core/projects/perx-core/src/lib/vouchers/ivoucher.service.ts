import { Observable } from 'rxjs';
import { IVoucher } from './models/voucher.model';

export interface IVoucherService {
  getAll(): Observable<IVoucher[]>;
  get(id: number): Observable<IVoucher>;
  redeemVoucher(id: number): Observable<any>;
  reset(vouchers?: IVoucher[]): void;
}
