import { Observable } from 'rxjs';
import { IGetVoucherParams, IVoucher, IRedeemOptions } from './models/voucher.model';

export abstract class IVoucherService {
  public abstract getAll(voucherParams?: IGetVoucherParams): Observable<IVoucher[]>;
  public abstract get(id: number, useCache?: boolean): Observable<IVoucher>;
  public abstract redeemVoucher(id: number, options?: IRedeemOptions): Observable<any>;
  public abstract reset(vouchers?: IVoucher[]): void;
  public abstract newVouchersCreatedForReward(rewardId: number, intervalPeriod?: number): Observable<IVoucher[]>;
  public abstract stateChangedForVoucher(voucherId: number, intervalPeriod?: number): Observable<IVoucher>;
}
