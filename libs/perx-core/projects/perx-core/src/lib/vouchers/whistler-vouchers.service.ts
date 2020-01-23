import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { IVoucherService } from './ivoucher.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IVoucher, IGetVoucherParams, VoucherState } from './models/voucher.model';
import { map, switchMap } from 'rxjs/operators';
import { RewardsService } from '../rewards/rewards.service';
import { IReward, IRewardParams } from '../rewards/models/reward.model';

import {
  IWAssignedAttributes,
  WAssignedStatus,
  IJsonApiListPayload,
  IJsonApiItem,
  IJsonApiItemPayload,
  IWPurchaseAttributes,
} from '@perx/whistler';
import { oc } from 'ts-optchain';

@Injectable({
  providedIn: 'root'
})
export class WhistlerVouchersService implements IVoucherService {
  // quick cache
  private vouchers: IVoucher[] = [];

  constructor(
    private http: HttpClient,
    private config: Config,
    private rewardsService: RewardsService,
  ) { }

  private static WVoucherStatusToState(stat: WAssignedStatus): VoucherState {
    switch (stat) {
      case WAssignedStatus.assigned:
      case WAssignedStatus.issued:
        return VoucherState.issued;
      case WAssignedStatus.reserved:
        return VoucherState.reserved;
      case WAssignedStatus.expired:
        return VoucherState.expired;
      default:
        return VoucherState.redeemed;
    }
  }

  private static WVoucherToVoucher(voucher: IJsonApiItem<IWAssignedAttributes>, reward: IReward): IVoucher {
    return {
      id: (typeof voucher.id === 'string') ? Number.parseInt(voucher.id, 10) : voucher.id,
      reward,
      state: WhistlerVouchersService.WVoucherStatusToState(voucher.attributes.status),
      code: voucher.attributes.value,
      expiry: voucher.attributes.valid_to ? new Date(voucher.attributes.valid_to) : null,
      // @ts-ignore
      redemptionType: reward.redemptionType,
    };
  }

  private static compare(a: IVoucher, b: IVoucher): number {
    const merchantIdA: number | undefined = oc(a).reward.merchantId();
    const merchantIdB: number | undefined = oc(b).reward.merchantId();

    if (merchantIdA ? !merchantIdB : merchantIdB) {
      return !merchantIdA ? 1 : -1;
    }

    return 0;
  }

  // @ts-ignore
  public getAll(voucherParams?: IGetVoucherParams): Observable<IVoucher[]> {
    return new Observable(subscriber => {
      let vouchers: IVoucher[] = [];
      if (this.vouchers.length > 0) {
        // if cache is not empty let's emit the cache first
        subscriber.next(vouchers);
      }
      const process = (p: number, res: IJsonApiListPayload<IWAssignedAttributes>) => {
        const vsQuerries: Observable<IVoucher>[] = res.data.map(v => this.getFullVoucher(v));
        combineLatest(vsQuerries)
          .subscribe((vs: IVoucher[]) => {
            vouchers = vouchers.concat(vs).sort(WhistlerVouchersService.compare);
            // update data in the cache
            this.vouchers = vouchers;
            subscriber.next(vouchers);
            if (!res.meta || !res.meta.page_count || p >= res.meta.page_count) {
              subscriber.complete();
            } else {
              // tslint:disable-next-line: rxjs-no-nested-subscribe
              this.getPage(p + 1).subscribe(resi => process(p + 1, resi));
            }
          });
      };
      return this.getPage(1).subscribe(vs => process(1, vs));
    });
  }

  private getPage(page: number, size: number = 10): Observable<IJsonApiListPayload<IWAssignedAttributes>> {
    return this.http.get<IJsonApiListPayload<IWAssignedAttributes>>(`${this.vouchersUrl}?page[number]=${page}&page[size]=${size}`);
  }

  /**
   * @package
   */
  public getFullVoucher(voucher: IJsonApiItem<IWAssignedAttributes>): Observable<IVoucher> {
    return combineLatest(of(voucher), this.rewardsService.getReward(voucher.attributes.source_id))
      .pipe(
        map(([v, reward]: [IJsonApiItem<IWAssignedAttributes>, IReward]) => WhistlerVouchersService.WVoucherToVoucher(v, reward))
      );
  }

  // @ts-ignore
  public get(id: number, useCache?: boolean): Observable<IVoucher> {
    return this.http.get<IJsonApiItemPayload<IWAssignedAttributes>>(`${this.vouchersUrl}/${id}`)
      .pipe(
        map((res) => res.data),
        switchMap((voucher: IJsonApiItem<IWAssignedAttributes>) => this.getFullVoucher(voucher))
      );
  }

  // @ts-ignore
  public redeemVoucher(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  public reset(vouchers?: IVoucher[]): void {
    this.vouchers = vouchers !== undefined ? vouchers : [];
  }

  // @ts-ignore
  public newVouchersCreatedForReward(rewardId: number, intervalPeriod?: number): Observable<IVoucher[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public stateChangedForVoucher(voucherId: number, intervalPeriod?: number): Observable<IVoucher> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public reserveReward(rewardId: number, params?: IRewardParams): Observable<IVoucher> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public issueReward(rewardId: number, sourceType?: string, locale: string = 'en', cardId?: number): Observable<IVoucher> {

    return this.http.post<IJsonApiItemPayload<IWPurchaseAttributes>>(`${this.config.apiHost}/voucher-service/purchase_requests`,
      {
        data: {
          type: 'purchase_request',
          attributes: {
            loyalty_card_id: cardId,
            reward_entity_id: rewardId
          }
        }
      }
    ).pipe(
      map(res => res.data.attributes.voucher_id),
      switchMap((voucherId: number) => this.get(voucherId))
    );
  }

  private get vouchersUrl(): string {
    return `${this.config.apiHost}/voucher-service/vouchers`;
  }
  // @ts-ignore
  public getFromPage(page: number, voucherParams?: IGetVoucherParams, locale?: string): Observable<IVoucher[]> {
    throw new Error('Method not implemented.');
  }
}
