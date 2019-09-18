import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { IVoucherService } from './ivoucher.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IVoucher, IGetVoucherParams, VoucherState, RedemptionType } from './models/voucher.model';
import { IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from '../jsonapi.payload';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { RewardsService } from '../rewards/rewards.service';
import { IReward, IRewardParams } from '../rewards/models/reward.model';
import { IMerchant } from '../merchants/models/merchants.model';
import { IMerchantsService } from '../merchants/imerchants.service';

const enum VoucherStatus {
  assigned = 'assigned'
}
interface IWhistlerVoucher {
  urn: string;
  created_at: string;
  updated_at: string;
  batch_id: number;
  code: string;
  assigned_to_id: number;
  status: VoucherStatus;
  source_id: number;
  source_type: string;
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
    private merchantsService: IMerchantsService
  ) { }

  private static WVoucherStatusToState(stat: VoucherStatus): VoucherState {
    switch (stat) {
      case VoucherStatus.assigned:
        return VoucherState.issued;
      default:
        return VoucherState.redeemed;
    }
  }

  private static WVoucherToVoucher(voucher: IJsonApiItem<IWhistlerVoucher>, reward: IReward, merchant: IMerchant): IVoucher {
    return {
      id: (typeof voucher.id === 'string') ? Number.parseInt(voucher.id, 10) : voucher.id,
      rewardId: voucher.attributes.source_id, // use at \lib\vouchers\vouchers.service.ts
      state: WhistlerVouchersService.WVoucherStatusToState(voucher.attributes.status),
      name: reward.name,
      code: voucher.attributes.code,
      // redemptionType: RedemptionType[reward.howToRedeem],
      redemptionType: RedemptionType.txtCode,
      thumbnailImg: reward.rewardThumbnail,
      rewardBanner: reward.rewardThumbnail,
      merchantImg: merchant.images && merchant.images[0].url || '',
      merchantName: merchant.name,
      expiry: null,
      description: [{
        title: null,
        content: reward.description,
        tag: []
      }]
    };
  }

  // @ts-ignore
  public getAll(voucherParams?: IGetVoucherParams): Observable<IVoucher[]> {
    return this.http.get<IJsonApiListPayload<IWhistlerVoucher>>(this.vouchersUrl)
      .pipe(
        map((res) => res.data),
        mergeMap((vouchers: IJsonApiItem<IWhistlerVoucher>[]) => combineLatest(...vouchers.map(v => this.getFullVoucher(v))))
      );
  }

  private getFullVoucher(voucher: IJsonApiItem<IWhistlerVoucher>): Observable<IVoucher> {
    return combineLatest(of(voucher), this.rewardsService.getReward(voucher.attributes.source_id))
      .pipe(
        mergeMap(
          ([v, reward]: [IJsonApiItem<IWhistlerVoucher>, IReward]) =>
            combineLatest(of(v), of(reward), this.merchantsService.getMerchant(1))
          // combineLatest(of(v), of(reward), this.merchantsService.getMerchant(reward.organization_id))
        ),
        map(([v, reward, merchant]: [IJsonApiItem<IWhistlerVoucher>, IReward, IMerchant]) =>
          WhistlerVouchersService.WVoucherToVoucher(v, reward, merchant))
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
    return `${this.config.apiHost}/voucher/entities`;
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
