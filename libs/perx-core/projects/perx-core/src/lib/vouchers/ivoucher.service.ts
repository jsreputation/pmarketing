import { Observable } from 'rxjs';
import { IVoucher } from './models/voucher.model';

interface IV4Voucher {
  reward?: any;
}

export interface IVoucherService {
  getAll(): Observable<IVoucher[]>;
  getAllFromPage(page: number): Observable<IV4Voucher[]>;
  vouchersUrl(): string;
  get(id: number): Observable<IVoucher>;
  redeemVoucher(id: number): Observable<any>;
  reset(): void;
}