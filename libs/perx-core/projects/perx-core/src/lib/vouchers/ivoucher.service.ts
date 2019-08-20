import { Observable } from 'rxjs';
import { IVoucher } from './models/voucher.model';

export interface IVoucherService {
  getAll(): Observable<IVoucher[]>;
  get(id: number, useCache?: boolean): Observable<IVoucher>;
  redeemVoucher(id: number): Observable<any>;
  reset(vouchers?: IVoucher[]): void;
  newVouchersCreatedForReward(rewardId: number, intervalPeriod?: number): Observable<IVoucher[]>;
  stateChangedForVoucher(voucherId: number, intervalPeriod?: number): Observable<IVoucher>;
}
