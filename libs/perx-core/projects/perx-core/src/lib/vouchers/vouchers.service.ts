import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IVoucher } from './models/voucher.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {
  vouchers: IVoucher[] = [];

  constructor(
    private http: HttpClient,
    @Inject('config') private config: any
  ) {
  }

  private static voucherToVoucher(v: any): IVoucher {
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
      expiresAt: new Date(reward[`valid_to`]),
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

    const url = `${this.config.env.apiHost}/v4/vouchers`;
    return this.http.get(url).pipe(
      map(resp => resp[`data`]),
      map(vouchers => {
        this.vouchers = vouchers.map((v: any) => VouchersService.voucherToVoucher(v));
        console.log(vouchers);
        return this.vouchers;
      })
    );
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
        // this.vouchers.push(voucher);
        return voucher;
      })
    );
  }

  redeemVoucher(id: string): Observable<any> {
    const url = `${this.config.env.apiHost}/v4/vouchers/${id}/redeem`;

    return this.http.post(url, null, {}).pipe(
      tap(_ => {
        this.vouchers = [];
      })
    );
  }
}
