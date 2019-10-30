import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { IVoucherService } from './ivoucher.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IVoucher, IGetVoucherParams, VoucherState } from './models/voucher.model';
import { IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from '../jsonapi.payload';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { RewardsService } from '../rewards/rewards.service';
import { IReward, IRewardParams } from '../rewards/models/reward.model';

const enum VoucherStatus {
  assigned = 'assigned',
  issued = 'issued',
}

export interface IWhistlerVoucher {
  urn: string;
  created_at: string;
  updated_at: string;
  batch_id: number;
  code: string;
  assigned_to_id: number;
  status: VoucherStatus;
  source_id: number;
  source_type: string;
  end_date_time: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhistlerVouchersService implements IVoucherService {
  constructor(
    // @ts-ignore
    private http: HttpClient,
    // @ts-ignore
    private config: Config,
    private rewardsService: RewardsService,
  ) { }

  private static WVoucherStatusToState(stat: VoucherStatus): VoucherState {
    switch (stat) {
    case VoucherStatus.assigned:
    case VoucherStatus.issued:
      return VoucherState.issued;
    default:
      return VoucherState.redeemed;
    }
  }

  private static WVoucherToVoucher(voucher: IJsonApiItem<IWhistlerVoucher>, reward: IReward): IVoucher {
    return {
      id: (typeof voucher.id === 'string') ? Number.parseInt(voucher.id, 10) : voucher.id,
      reward,
      state: WhistlerVouchersService.WVoucherStatusToState(voucher.attributes.status),
      code: voucher.attributes.code,
      expiry: voucher.attributes.end_date_time ? new Date(voucher.attributes.end_date_time) : null,
    };
  }

  // @ts-ignore
  public getAll(voucherParams?: IGetVoucherParams): Observable<IVoucher[]> {
    return this.http.get<IJsonApiListPayload<IWhistlerVoucher>>(this.vouchersUrl)
      .pipe(
        map((res) => res.data),
        mergeMap((vouchers: IJsonApiItem<IWhistlerVoucher>[]) => combineLatest(...vouchers.map(v => this.getFullVoucher(v)))),
        map(vouchers => vouchers.sort((elA, elB) => {
          const merchantIdA: number = elA.reward.merchantId;
          const merchantIdB: number = elB.reward.merchantId;

          if (merchantIdA ? !merchantIdB : merchantIdB) {
            return !merchantIdA ? 1 : -1;
          }

          return 0;
        }))
      );
  }

  private getFullVoucher(voucher: IJsonApiItem<IWhistlerVoucher>): Observable<IVoucher> {
    return combineLatest(of(voucher), this.rewardsService.getReward(voucher.attributes.source_id))
      .pipe(
        map(([v, reward]: [IJsonApiItem<IWhistlerVoucher>, IReward]) => WhistlerVouchersService.WVoucherToVoucher(v, reward))
      );
  }

  // @ts-ignore
  public get(id: number, useCache?: boolean): Observable<IVoucher> {
    return this.http.get<IJsonApiItemPayload<IWhistlerVoucher>>(this.vouchersUrl + '/' + id).pipe(
      map((res) => res.data),
      switchMap((voucher: IJsonApiItem<IWhistlerVoucher>) => this.getFullVoucher(voucher))
    );
  }

  // @ts-ignore
  public redeemVoucher(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public reset(vouchers?: IVoucher[]): void {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public newVouchersCreatedForReward(rewardId: number, intervalPeriod?: number): Observable<IVoucher[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public stateChangedForVoucher(voucherId: number, intervalPeriod?: number): Observable<IVoucher> {
    throw new Error('Method not implemented.');
  }

  private get vouchersUrl(): string {
    return `${this.config.apiHost}/voucher-service/vouchers`;
  }

  // @ts-ignore
  public reserveReward(rewardId: number, params?: IRewardParams): Observable<IVoucher> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  public issueReward(rewardId: number): Observable<IVoucher> {
    throw new Error('Method not implemented.');
  }
}
