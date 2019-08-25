import { Observable } from 'rxjs';
import {IGetVoucherParams, IVoucher} from './models/voucher.model';

export interface IVoucherService {
  getAll(voucherParams?: IGetVoucherParams): Observable<IVoucher[]>;
  get(id: number, useCache?: boolean): Observable<IVoucher>;
  redeemVoucher(id: number): Observable<any>;
  reset(vouchers?: IVoucher[]): void;
  newVouchersCreatedForReward(rewardId: number, intervalPeriod?: number): Observable<IVoucher[]>;
  stateChangedForVoucher(voucherId: number, intervalPeriod?: number): Observable<IVoucher>;
}
