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
import { IAssignedAttributes, AssignedStatus } from '@perx/whistler';

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

  private static WVoucherStatusToState(stat: AssignedStatus): VoucherState {
    switch (stat) {
      case AssignedStatus.assigned:
      case AssignedStatus.issued:
        return VoucherState.issued;
      default:
        return VoucherState.redeemed;
    }
  }

  private static WVoucherToVoucher(voucher: IJsonApiItem<IAssignedAttributes>, reward: IReward): IVoucher {
    return {
      id: (typeof voucher.id === 'string') ? Number.parseInt(voucher.id, 10) : voucher.id,
      reward,
      state: WhistlerVouchersService.WVoucherStatusToState(voucher.attributes.status),
      code: voucher.attributes.value,
      expiry: voucher.attributes.valid_to ? new Date(voucher.attributes.valid_to) : null,
    };
  }

  // @ts-ignore
  public getAll(voucherParams?: IGetVoucherParams): Observable<IVoucher[]> {
    return this.http.get<IJsonApiListPayload<IAssignedAttributes>>(this.vouchersUrl)
      .pipe(
        map((res) => res.data),
        mergeMap((vouchers: IJsonApiItem<IAssignedAttributes>[]) => combineLatest(...vouchers.map(v => this.getFullVoucher(v)))),
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

  private getFullVoucher(voucher: IJsonApiItem<IAssignedAttributes>): Observable<IVoucher> {
    return combineLatest(of(voucher), this.rewardsService.getReward(voucher.attributes.source_id))
      .pipe(
        map(([v, reward]: [IJsonApiItem<IAssignedAttributes>, IReward]) => WhistlerVouchersService.WVoucherToVoucher(v, reward))
      );
  }

  // @ts-ignore
  public get(id: number, useCache?: boolean): Observable<IVoucher> {
    return this.http.get<IJsonApiItemPayload<IAssignedAttributes>>(`${this.vouchersUrl}/${id}`)
      .pipe(
        map((res) => res.data),
        switchMap((voucher: IJsonApiItem<IAssignedAttributes>) => this.getFullVoucher(voucher))
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
