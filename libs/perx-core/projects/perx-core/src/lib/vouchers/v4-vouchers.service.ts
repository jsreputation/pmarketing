import { Injectable } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IVoucher, VoucherState, RedemptionType, IGetVoucherParams, IRedeemOptions } from './models/voucher.model';
import { map, tap, flatMap, mergeAll, scan, filter, switchMap } from 'rxjs/operators';
import { IVoucherService } from './ivoucher.service';
import { oc } from 'ts-optchain';
import { Config } from '../config/config';
import { IRewardParams } from '../rewards/models/reward.model';

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

interface IV4Image {
  type: string;
  url: string;
}

interface IV4Reward {
  terms_and_conditions: string;
  description: string;
  valid_to: any;
  merchant_name: string;
  id: number;
  images?: IV4Image[];
  merchant_logo_url?: string;
  category_tags?: {
    id: number;
    title: string;
    parent: any;
  }[];
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
  redemption_type: RedemptionType | {
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
    const reward = v.reward;
    const images: IV4Image[] = reward.images || [];
    let thumbnail: IV4Image = images.find((image: IV4Image) => image.type === 'reward_thumbnail');
    if (thumbnail === undefined) {
      thumbnail = images.find((image: IV4Image) => image.type === 'reward_logo');
    }
    const thumbnailImg = thumbnail && thumbnail.url;
    const banner: IV4Image = images.find((image: IV4Image) => image.type === 'reward_banner');
    const rewardBanner = banner && banner.url;
    const merchantImg = v.reward.merchant_logo_url ? v.reward.merchant_logo_url : null;
    const redemptionSuccessTxt = v.redemption_text ? v.redemption_text : null;
    const redemptionSuccessImg = v.redemption_image ? v.redemption_image : null;
    let redemptionTypeFinal: RedemptionType = null;
    if (v.redemption_type) {
      if ((typeof v.redemption_type) === 'string') {
        // @ts-ignore
        redemptionTypeFinal = v.redemption_type;
        // @ts-ignore
      } else if (v.redemption_type.type) {
        // @ts-ignore
        redemptionTypeFinal = v.redemption_type.type;
      }
    }
    redemptionTypeFinal = redemptionTypeFinal || v.voucher_type;
    if (!(redemptionTypeFinal in RedemptionType)) {
      redemptionTypeFinal = RedemptionType.txtCode;
    }

    let categories: string[];
    if (reward.category_tags) {
      categories = reward.category_tags.map(c => c.title);
    }

    return {
      id: v.id,
      rewardId: reward.id,
      reward: null,
      state: v.state,
      name: v.name,
      code: v.voucher_code,
      redemptionType: redemptionTypeFinal,
      thumbnailImg,
      rewardBanner,
      merchantImg,
      merchantName: reward.merchant_name,
      expiry: reward.valid_to !== null ? new Date(reward.valid_to) : null,
      redemptionDate: v.redemption_date !== null ? new Date(v.redemption_date) : null,
      description: [
        { title: 'Description', content: reward.description, tag: [] },
        { title: 'Terms and Conditions', content: reward.terms_and_conditions, tag: [] }
      ],
      redemptionSuccessTxt,
      redemptionSuccessImg,
      categories
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
        map((vouchers: IVoucher[]) => vouchers.sort((v1, v2) => v1.rewardId - v2.rewardId)),
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

    return this.http.get<IV4VouchersResponse>(this.vouchersUrl, { params })
      .pipe(
        map(res => res.data)
      );
  }

  get vouchersUrl(): string {
    return `${this.config.apiHost}/v4/vouchers?redeemed_within=-1&expired_within=-1`;
  }

  public get(id: number, useCache: boolean = true): Observable<IVoucher> {
    if (useCache) {
      const found = this.vouchers.find(v => `${v.id}` === `${id}`);
      if (found) {
        return of(found);
      }
    }
    const url = `${this.config.apiHost}/v4/vouchers/${id}`;
    return this.http.get<IV4VoucherResponse>(url).pipe(
      map(resp => resp.data),
      map((v: IV4Voucher) => V4VouchersService.v4VoucherToVoucher(v)),
      // if the vouchers list was not empty but we are here, it means it is a new voucher, so let's add it.
      tap((v: IVoucher) => { if (this.vouchers.length > 0) { this.vouchers.unshift(v); } })
    );
  }

  public redeemVoucher(id: number, options?: IRedeemOptions): Observable<any> {
    const url = `${this.config.apiHost}/v4/vouchers/${id}/redeem`;
    if (!options) {
      options = null;
    }

    return this.http.post(url, options, {})
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
      map((vouchers: IVoucher[]) => vouchers.filter(v => v.rewardId === rewardId && v.state === 'issued')),
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

    return this.http.post<IV4ReserveRewardResponse>(
      `${this.config.apiHost}/v4/rewards/${rewardId}/reserve`, null, { params }
    ).pipe(
      map(res => res.data),
      switchMap((minVoucher: IV4MinifiedVoucher) => this.get(minVoucher.id)),
    );
  }

  public issueReward(rewardId: number): Observable<IVoucher> {
    return this.http.post<IV4ReserveRewardResponse>(
      `${this.config.apiHost}/v4/rewards/${rewardId}/issue`, {}
    ).pipe(
      map(res => res.data),
      switchMap((minVoucher: IV4MinifiedVoucher) => this.get(minVoucher.id)),
    );
  }
}
