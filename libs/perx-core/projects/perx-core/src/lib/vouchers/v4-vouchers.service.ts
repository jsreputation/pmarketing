import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { oc } from 'ts-optchain';
import { interval, Observable, of } from 'rxjs';
import { filter, flatMap, map, mergeAll, scan, switchMap, tap } from 'rxjs/operators';

import { IVoucherService } from './ivoucher.service';
import { IGetVoucherParams, IRedeemOptions, IVoucher, RedemptionType, VoucherState } from './models/voucher.model';

import { Config } from '../config/config';
import { IRewardParams } from '../rewards/models/reward.model';
import { IV4Reward, V4RewardsService } from '../rewards/v4-rewards.service';

interface IV4Meta {
  count?: number;
  size?: number;
  total_pages?: number;
  page?: number;
}

interface IV4ReserveRewardResponse {
  data: IV4MinifiedVoucher;
  meta?: IV4Meta;
}

interface IV4MinifiedVoucher {
  id: number;
  voucher_code: string;
  voucher_key: string;
  state: VoucherState;
  custom_fields: any;
  reserved_expires_at: Date;
}

interface IV4VouchersResponse {
  data: IV4Voucher[];
  meta: {
    count: number
    page: number
    size: number
    total_pages: number
  };
}

interface IV4VoucherResponse {
  data: IV4Voucher;
}

export interface IV4Voucher {
  custom_fields: any;
  given_by: any;
  given_date: any;
  given_to: any;
  id: number;
  issued_date: string;
  name: string;
  redemption_date: any;
  redemption_type: {
    call_to_action: any;
    timer: any;
    type: RedemptionType | null;
  };
  reservation_expires_at: any;
  reward?: IV4Reward;
  state: VoucherState;
  valid_from: string;
  valid_to: string;
  voucher_code: any;
  voucher_key: any;
  voucher_type: RedemptionType;
  redemption_image?: any;
  redemption_text?: any;
}

@Injectable({
  providedIn: 'root'
})
export class V4VouchersService implements IVoucherService {
  private vouchers: IVoucher[] = [];

  constructor(
    private http: HttpClient,
    private config: Config
  ) {
  }

  public static v4VoucherToVoucher(v: IV4Voucher): IVoucher {
    const reward: IV4Reward | null = v.reward ? v.reward : null;

    return {
      id: v.id,
      reward: reward ? V4RewardsService.v4RewardToReward(reward) : null,
      state: v.state,
      code: v.voucher_code,
      expiry: reward && reward.valid_to !== null ? new Date(reward.valid_to) : null,
      redemptionDate: v.redemption_date !== null ? new Date(v.redemption_date) : null,
      redemptionType: v.redemption_type !== null && v.redemption_type.type !== null ? v.redemption_type.type :
        v.voucher_type.toString() === 'code' ? RedemptionType.txtCode : v.voucher_type
    };
  }

  public getAll(voucherParams?: IGetVoucherParams): Observable<IVoucher[]> {
    if (this.vouchers.length > 0) {
      return of(this.vouchers);
    }
    let params = new HttpParams()
      .set('sort_by', 'id')
      .set('order', 'desc');

    if (oc(voucherParams).type()) {
      params = params.set('type', voucherParams.type);
    }

    if (oc(voucherParams).sourceType()) {
      params = params.set('source_type', voucherParams.sourceType);
    }

    return this.http.get<IV4VouchersResponse>(this.vouchersUrl, { params })
      .pipe(
        // todo change to a combination of switchMap and combineLatest
        flatMap((resp: IV4VouchersResponse) => {
          const streams = [
            of(resp.data)
          ];
          for (let i = 2; i <= resp.meta.total_pages; i++) {
            const stream: Observable<IV4Voucher[]> = this.getAllFromPage(i, voucherParams);
            streams.push(stream);
          }
          return streams;
        }),
        mergeAll(),
        map((resp: IV4Voucher[]) => resp.map(v => V4VouchersService.v4VoucherToVoucher(v))),
        scan((acc: IVoucher[], curr: IVoucher[]) => acc.concat(curr), []),
        map((vouchers: IVoucher[]) => vouchers.sort((v1, v2) => v1.reward.id - v2.reward.id)),
        tap(vouchers => this.vouchers = vouchers)
      );
  }

  public getAllFromPage(page: number, voucherParams?: IGetVoucherParams): Observable<IV4Voucher[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('sort_by', 'id')
      .set('order', 'desc');

    if (oc(voucherParams).type()) {
      params = params.set('type', voucherParams.type);
    }
    if (oc(voucherParams).sourceType()) {
      params = params.set('source_type', voucherParams.sourceType);
    }
    return this.http.get<IV4VouchersResponse>(this.vouchersUrl, { params })
      .pipe(
        map(res => res.data)
      );
  }

  get vouchersUrl(): string {
    return `${this.config.apiHost}/v4/vouchers?redeemed_within=-1&expired_within=-1`;
  }

  public get(id: number, useCache: boolean = true, voucherParams?: IGetVoucherParams): Observable<IVoucher> {
    if (useCache) {
      const found = this.vouchers.find(v => `${v.id}` === `${id}`);
      if (found) {
        return of(found);
      }
    }
    let params = new HttpParams();
    if (voucherParams && oc(voucherParams).sourceType) {
      params = params.set('source_type', voucherParams.sourceType);
    }
    const url = `${this.config.apiHost}/v4/vouchers/${id}`;
    return this.http.get<IV4VoucherResponse>(url, { params }).pipe(
      map(resp => resp.data),
      map((v: IV4Voucher) => V4VouchersService.v4VoucherToVoucher(v)),
      // if the vouchers list was not empty but we are here, it means it is a new voucher, so let's add it.
      tap((v: IVoucher) => {
        if (this.vouchers.length > 0 && !this.vouchers.some((voucher) => voucher.id === v.id)) {
          this.vouchers.unshift(v);
        }
      })
    );
  }

  public redeemVoucher(id: number, options?: IRedeemOptions): Observable<any> {
    const url = `${this.config.apiHost}/v4/vouchers/${id}/redeem`;
    const post: IRedeemOptions | null = !options ? null : options;

    return this.http.post(url, post, {})
      .pipe(
        tap(_ => this.reset())
      );
  }

  // resets the current cache to a new list or by default nothing, and it will filled during the next call to getAll
  public reset(vouchers: IVoucher[] = []): void {
    this.vouchers = vouchers;
  }

  public newVouchersCreatedForReward(rewardId: number, intervalPeriod: number = 1000): Observable<IVoucher[]> {
    let current = 0;
    let firstPageVouchers: number[] = [];
    let newIssued: IVoucher[] = [];
    return interval(intervalPeriod).pipe(
      map(val => {
        current = val;
        return this.getAllFromPage(1);
      }),
      mergeAll(1),
      map((v4Vouchers: IV4Voucher[]) => v4Vouchers.map((v4Voucher: IV4Voucher) => V4VouchersService.v4VoucherToVoucher(v4Voucher))),
      map((vouchers: IVoucher[]) => vouchers.filter(v => v.reward && v.reward.id === rewardId && v.state === 'issued')),
      filter((vouchers: IVoucher[]) => {
        if (current === 0) {
          firstPageVouchers = [
            ...vouchers.map(v => v.id)
          ];
          return false;
        }

        if (vouchers && vouchers.length <= 0) {
          firstPageVouchers = [];
          return false;
        }

        newIssued = vouchers.filter(v => !firstPageVouchers.includes(v.id));
        if (newIssued && newIssued.length <= 0) {
          return false;
        }

        firstPageVouchers = [
          ...vouchers.map(v => v.id)
        ];

        return true;
      }),
      map((_: IVoucher[]) => newIssued)
    );
  }

  public stateChangedForVoucher(voucherId: number, intervalPeriod: number = 1000): Observable<IVoucher> {
    let current = 0;
    let previousState: string;
    return interval(intervalPeriod).pipe(
      map(val => {
        current = val;
        return this.get(voucherId, false);
      }),
      mergeAll(1),
      filter((voucher: IVoucher) => {
        if (current === 0) {
          previousState = voucher.state;
          return false;
        }

        if (previousState === voucher.state) {
          return false;
        }

        previousState = voucher.state;

        return true;
      })
    );
  }

  public reserveReward(rewardId: number, rewardParams?: IRewardParams): Observable<IVoucher> {
    let params = new HttpParams();

    if (oc(rewardParams).locationId()) {
      params = params.set('location_id', rewardParams.locationId.toString());
    }
    if (oc(rewardParams).priceId()) {
      params = params.set('price_id', rewardParams.priceId.toString());
    }
    if (oc(rewardParams).sourceType()) {
      params = params.set('source_type', rewardParams.sourceType);
    }
    return this.http.post<IV4ReserveRewardResponse>(
      `${this.config.apiHost}/v4/rewards/${rewardId}/reserve`, null, { params }
    ).pipe(
      map(res => res.data),
      switchMap((minVoucher: IV4MinifiedVoucher) => this.get(minVoucher.id)),
    );
  }

  public issueReward(rewardId: number, sourceType?: string): Observable<IVoucher> {
    let params = new HttpParams();
    if (sourceType) {
      params = params.set('source_type', sourceType);
    }
    return this.http.post<IV4ReserveRewardResponse>(
      `${this.config.apiHost}/v4/rewards/${rewardId}/issue`, { params }
    ).pipe(
      map(res => res.data),
      switchMap((minVoucher: IV4MinifiedVoucher) => this.get(minVoucher.id)),
    );
  }
}
