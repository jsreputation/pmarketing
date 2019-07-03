import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IVoucher } from './models/voucher.model';
import { map, tap, flatMap, mergeAll, scan } from 'rxjs/operators';

interface IV4VouchersResponse {
  data: IV4Voucher[];
  meta: {
    count: number
    page: number
    size: number
    total_pages: number
  };
}

interface IV4Voucher {
  reward?: any;
}

@Injectable({
  providedIn: 'root'
})
export class VouchersService {
  private vouchers: IVoucher[] = [];

  constructor(
    private http: HttpClient,
    @Inject('config') private config: any
  ) {
  }

  public static voucherToVoucher(v: any): IVoucher {
    const reward = v[`reward`];
    const images = reward[`images`] || [];
    let thumbnail = images.find((image: any) => image[`type`] === 'reward_thumbnail');
    if (thumbnail === undefined) {
      thumbnail = images.find((image: any) => image[`type`] === 'reward_logo');
    }
    const thumbnailUrl = thumbnail && thumbnail.url;
    const banner = images.find((image: any) => image[`type`] === 'reward_banner');
    const bannerUrl = banner && banner.url;
    const merchantLogo = images.find((image: any) => image[`type`] === 'merchant_logo');
    const merchantLogoUrl = merchantLogo && merchantLogo.url;
    const redeemedOn = v[`redemption_date`];
    const howToRedeem = reward.custom_fields && reward.custom_fields.how_to_redeem ? reward.custom_fields.how_to_redeem : null;

    return {
      id: v[`id`],
      rewardId: reward[`id`],
      state: v[`state`],
      name: v[`name`],
      code: v[`voucher_code`],
      description: reward[`description`],
      thumbnailUrl,
      bannerUrl,
      expiresAt: reward[`valid_to`] !== null ? new Date(reward[`valid_to`]) : null,
      redeemedOn,
      merchantName: reward[`merchant_name`],
      merchantLogoUrl,
      termsAndConditions: reward[`terms_and_conditions`],
      howToRedeem
    };
  }

  getAll(): Observable<IVoucher[]> {
    if (this.vouchers.length > 0) {
      return of(this.vouchers);
    }

    return this.http.get<IV4VouchersResponse>(this.vouchersUrl)
      .pipe(
        flatMap((resp: IV4VouchersResponse) => {
          const streams = [
            of(resp.data)
          ];
          for (let i = 2; i <= resp.meta.total_pages; i++) {
            const stream: Observable<IV4Voucher[]> = this.getAllFromPage(i);
            streams.push(stream);
          }
          return streams;
        }),
        mergeAll(),
        map((resp: IV4Voucher[]) => resp.map(v => VouchersService.voucherToVoucher(v))),
        scan((acc: IVoucher[], curr: IVoucher[]) => acc.concat(curr), []),
        map((vouchers: IVoucher[]) => vouchers.sort((v1, v2) => v1.rewardId - v2.rewardId)),
        tap(vouchers => this.vouchers = vouchers)
      );
  }

  getAllFromPage(page: number): Observable<IV4Voucher[]> {
    return this.http.get<IV4VouchersResponse>(`${this.vouchersUrl}&page=${page}`)
      .pipe(
        map(res => res.data)
      );
  }

  get vouchersUrl(): string {
    return `${this.config.env.apiHost}/v4/vouchers?redeemed_within=-1&expired_within=-1`;
  }

  get(id: number): Observable<IVoucher> {
    const found = this.vouchers.find(v => {
      return `${v.id}` === `${id}`;
    });
    if (found) {
      return of(found);
    }
    const url = `${this.config.env.apiHost}/v4/vouchers/${id}`;
    return this.http.get(url).pipe(
      map(resp => resp[`data`]),
      map(v => {
        const voucher = VouchersService.voucherToVoucher(v);
        return voucher;
      })
    );
  }

  redeemVoucher(id: number): Observable<any> {
    const url = `${this.config.env.apiHost}/v4/vouchers/${id}/redeem`;

    return this.http.post(url, null, {}).pipe(
      tap(_ => {
        this.vouchers = [];
      })
    );
  }

  reset(): void {
    this.vouchers = [];
  }
}
