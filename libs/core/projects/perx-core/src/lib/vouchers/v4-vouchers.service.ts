import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { oc } from 'ts-optchain';
import { interval, Observable, of } from 'rxjs';
import { filter, flatMap, map, mergeAll, scan, switchMap, tap, mergeMap } from 'rxjs/operators';

import { IVoucherService } from './ivoucher.service';
import { IGetVoucherParams, IRedeemOptions, IVoucher, IVoucherLocation } from './models/voucher.model';
import { IRewardParams } from '../rewards/models/reward.model';
import { IV4Reward, V4RewardsService } from '../rewards/v4-rewards.service';
import { RedemptionType } from '../perx-core.models';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { VoucherState } from './models/voucher.model';

interface IV4Meta {
  count?: number;
  size?: number;
  total_pages?: number;
  page?: number;
}

export interface IV4ReserveRewardResponse {
  data: IV4MinifiedVoucher;
  meta?: IV4Meta;
}

export interface IV4MinifiedVoucher {
  id: number;
  voucher_code: string;
  voucher_key: string;
  state: VoucherState;
  custom_fields: any;
  reserved_expires_at: Date;
}

export interface IV4VouchersResponse {
  data: IV4Voucher[];
  meta: {
    count: number
    page: number
    size: number
    total_pages: number
  };
}

export interface IV4VoucherResponse {
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

export interface IV4VoucherLocationsResponse {
  data: IV4VoucherLocation[];
}

export interface IV4VoucherLocation {
  id: number;
  name: string;
  phone_number: string;
  mobile_number: string;
  website_url: string;
  custom_fields: string;
  postal_code: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  latitude: string;
  longitude: string;
  shopping_mall: string;
  country: string;
  state: string;
  city: string;
  operating_hours: string;
}

@Injectable({
  providedIn: 'root'
})
export class V4VouchersService implements IVoucherService {
  private vouchers: IVoucher[] = [];
  private apiHost: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.apiHost = config.apiHost as string;
      });
  }

  public static v4VoucherToVoucher(v: IV4Voucher): IVoucher {
    const reward: IV4Reward | null = v.reward ? v.reward : null;
    const accessoryImage = reward && reward.images && reward.images.length ?
      reward.images.find((image) => image.type === 'accessory_image') : null;
    return {
      id: v.id,
      reward: reward ? V4RewardsService.v4RewardToReward(reward) : null,
      state: v.state,
      code: (typeof v.voucher_code === 'string') ? v.voucher_code : undefined,
      expiry: reward && reward.valid_to !== null ? new Date(reward.valid_to) : null,
      redemptionDate: v.redemption_date !== null ? new Date(v.redemption_date) : null,
      redemptionType:
        v.redemption_type !== null &&
          (v.redemption_type.type !== null && v.redemption_type.type !== 'offline') ? v.redemption_type.type :
          v.voucher_type.toString() === 'code' ? RedemptionType.txtCode : v.voucher_type,
      accessoryImage: oc(accessoryImage).url('')
    };
  }

  public static v4LocationToLocation(v: IV4VoucherLocation): IVoucherLocation {
    return {
      id: v.id,
      name: v.name
    };
  }

  public getAll(voucherParams?: IGetVoucherParams, locale: string = 'en'): Observable<IVoucher[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    // if (this.vouchers.length > 0) {
    //   return of(this.vouchers);
    // }
    let params = new HttpParams()
      .set('sort_by', 'id')
      .set('order', 'desc');

    if (voucherParams && voucherParams.type) {
      params = params.set('type', voucherParams.type);
    }

    if (voucherParams && voucherParams.sourceType) {
      params = params.set('source_type', voucherParams.sourceType);
    }

    return this.http.get<IV4VouchersResponse>(this.vouchersUrl, { headers, params })
      .pipe(
        // todo change to a combination of switchMap and combineLatest
        flatMap((resp: IV4VouchersResponse) => {
          const streams = [
            of(resp.data)
          ];
          for (let i = 2; i <= resp.meta.total_pages; i++) {
            const stream: Observable<IV4Voucher[]> = this.getAllFromPage(i, voucherParams, locale);
            streams.push(stream);
          }
          return streams;
        }),
        mergeAll(),
        map((resp: IV4Voucher[]) => resp.map(v => V4VouchersService.v4VoucherToVoucher(v))),
        scan((acc: IVoucher[], curr: IVoucher[]) => acc.concat(curr), []),
        map((vouchers: IVoucher[]) => vouchers.sort((v1, v2) => oc(v1).reward.id(0) - oc(v2).reward.id(0))),
        tap(vouchers => this.vouchers = vouchers)
      );
  }

  public getAllFromPage(page: number, voucherParams?: IGetVoucherParams, locale: string = 'en'): Observable<IV4Voucher[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    let params = new HttpParams()
      .set('page', page.toString())
      .set('sort_by', 'id')
      .set('order', 'desc');

    if (voucherParams && voucherParams.type) {
      params = params.set('type', voucherParams.type);
    }

    if (voucherParams && voucherParams.sourceType) {
      params = params.set('source_type', voucherParams.sourceType);
    }

    return this.http.get<IV4VouchersResponse>(this.vouchersUrl, { headers, params })
      .pipe(
        map(res => res.data)
      );
  }

  private get vouchersUrl(): string {
    return `${this.apiHost}/v4/vouchers?redeemed_within=-1&expired_within=-1`;
  }

  public get(id: number, useCache: boolean = true, voucherParams?: IGetVoucherParams, locale: string = 'en'): Observable<IVoucher> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    if (useCache) {
      const found = this.vouchers.find(v => `${v.id}` === `${id}`);
      if (found !== undefined) {
        return of(found);
      }
    }
    let params = new HttpParams();
    if (voucherParams && voucherParams.sourceType) {
      params = params.set('source_type', voucherParams.sourceType);
    }
    const url = `${this.apiHost}/v4/vouchers/${id}`;
    return this.http.get<IV4VoucherResponse>(url, { headers, params })
      .pipe(
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

  public redeemVoucher(id: number, options?: IRedeemOptions, locale: string = 'en'): Observable<any> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    const url = `${this.apiHost}/v4/vouchers/${id}/redeem`;
    const post: IRedeemOptions | null = !options ? null : options;

    return this.http.post(url, post, { headers })
      .pipe(
        tap(_ => this.reset())
      );
  }

  // resets the current cache to a new list or by default nothing, and it will filled during the next call to getAll
  public reset(vouchers: IVoucher[] = []): void {
    this.vouchers = vouchers;
  }

  public newVouchersCreatedForReward(rewardId: number, intervalPeriod: number = 1000, locale: string = 'en'): Observable<IVoucher[]> {
    let current = 0;
    let firstPageVouchers: number[] = [];
    let newIssued: IVoucher[] = [];
    return interval(intervalPeriod).pipe(
      map(val => {
        current = val;
        return this.getAllFromPage(1, undefined, locale);
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

  public stateChangedForVoucher(voucherId: number, intervalPeriod: number = 1000, locale: string = 'en'): Observable<IVoucher> {
    let current = 0;
    let previousState: string;
    return interval(intervalPeriod).pipe(
      map(val => {
        current = val;
        return this.get(voucherId, false, undefined, locale);
      }),
      mergeAll(1),
      filter((voucher: IVoucher) => {
        // todo: clean up this code because it creates 2 observables.
        // workaround is to return true on first run to dispose of one observable
        if (current === 0) {
          previousState = voucher.state;
          return true;
        }

        if (previousState === voucher.state) {
          return false;
        }

        previousState = voucher.state;
        return true;
      })
    );
  }

  public reserveReward(rewardId: number, rewardParams?: IRewardParams, locale: string = 'en'): Observable<IVoucher> {
    let params = new HttpParams();
    const headers = (new HttpHeaders()).set('Accept-Language', locale);
    if (rewardParams && rewardParams.locationId) {
      params = params.set('location_id', rewardParams.locationId.toString());
    }
    if (rewardParams && rewardParams.priceId) {
      params = params.set('price_id', rewardParams.priceId.toString());
    }
    if (rewardParams && rewardParams.sourceType) {
      params = params.set('source_type', rewardParams.sourceType);
    }
    return this.http.post<IV4ReserveRewardResponse>(`${this.apiHost}/v4/rewards/${rewardId}/reserve`, null, { headers, params })
      .pipe(
        map((res: IV4ReserveRewardResponse) => res.data),
        mergeMap((minVoucher: IV4MinifiedVoucher) => this.get(minVoucher.id, undefined, undefined, locale))
      );
  }

  public getRewardLocations(rewardId: number): Observable<IVoucherLocation[]> {
    return this.http.get<IV4VoucherLocationsResponse >(`${this.apiHost}/v4/rewards/${rewardId}/locations`)
      .pipe(
        map((res: IV4VoucherLocationsResponse) => res.data.map(location => V4VouchersService.v4LocationToLocation(location)))
      );
  }

  public issueReward(rewardId: number, sourceType?: string, locale: string = 'en'): Observable<IVoucher> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    let params = new HttpParams();
    if (sourceType) {
      params = params.set('source_type', sourceType);
    }
    return this.http.post<IV4ReserveRewardResponse>(`${this.apiHost}/v4/rewards/${rewardId}/issue`, { headers, params })
      .pipe(
        map(res => res.data),
        switchMap((minVoucher: IV4MinifiedVoucher) => this.get(minVoucher.id, undefined, undefined, locale)),
      );
  }

  public getFromPage(page: number, voucherParams?: IGetVoucherParams, locale: string = 'en'): Observable<IVoucher[]> {
    return this.getAllFromPage(page, voucherParams, locale)
      .pipe(map((resp: IV4Voucher[]) => resp.map(v => V4VouchersService.v4VoucherToVoucher(v))));
  }
}
