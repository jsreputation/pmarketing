import { Observable } from 'rxjs';
import { IGetVoucherParams, IVoucher, IRedeemOptions, IVoucherLocation } from './models/voucher.model';
import { IRewardParams } from '../rewards/models/reward.model';

export abstract class IVoucherService {
  public abstract getAll(voucherParams?: IGetVoucherParams, locale?: string): Observable<IVoucher[]>;
  public abstract get(id: number, useCache?: boolean, voucherParams?: IGetVoucherParams, locale?: string): Observable<IVoucher>;
  public abstract redeemVoucher(id: number, options?: IRedeemOptions, locale?: string): Observable<any>;
  public abstract reset(vouchers?: IVoucher[]): void;
  public abstract newVouchersCreatedForReward(rewardId: number, intervalPeriod?: number, locale?: string): Observable<IVoucher[]>;
  public abstract stateChangedForVoucher(voucherId: number, intervalPeriod?: number, locale?: string): Observable<IVoucher>;
  public abstract reserveReward(rewardId: number, rewardParams?: IRewardParams, locale?: string): Observable<IVoucher>;
  public abstract getRewardLocations(rewardId: number): Observable<IVoucherLocation[]>;
  public abstract issueReward(rewardId: number, sourceType?: string, locale?: string, cardId?: number): Observable<IVoucher>;
  public abstract getFromPage(page: number, voucherParams?: IGetVoucherParams, locale?: string): Observable<IVoucher[]>;
}
