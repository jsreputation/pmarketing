import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IVoucher } from './models/voucher.model';
import { map } from 'rxjs/operators';

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

  getAll(): Observable<IVoucher[]> {
    if (this.vouchers.length > 0) {
      return of(this.vouchers);
    }

    const url = `${this.config.env.apiHost}/v4/vouchers`;
    return this.http.get(url).pipe(
      map(resp => {
        const data = resp[`data`];
        const vouchers = Array.isArray(data) ? data : [data];

        this.vouchers = vouchers.map((v: any) => {
          const reward = v[`reward`];
          const images = reward[`images`] || [];
          const thumbnailUrl = images.find((image: any) => image[`type`] === 'reward_thumbnail');
          const bannerUrl = images.find((image: any) => image[`type`] === 'reward_banner');
          const merchantLogoUrl = images.find((image: any) => image[`type`] === 'merchant_logo');
          const voucher = {
            id: v[`id`],
            state: v[`state`],
            name: v[`name`],
            code: v[`voucher_code`],
            description: reward[`description`],
            thumbnailUrl,
            bannerUrl,
            expiresAt: new Date(reward[`valid_to`]),
            merchantName: reward[`merchant_name`],
            merchantLogoUrl,
            termsAndConditions: reward[`terms_and_conditions`]
          };
          return voucher;
        });
        return this.vouchers;
      })
    );
  }

  get(id: string|number): Observable<IVoucher> {
    const found = this.vouchers.find(v => {
      return `${v.id}` === `${id}`;
    });
    if (found) {
      return of(found);
    }

    const url = `${this.config.env.apiHost}/v4/vouchers/${id}`;
    return this.http.get(url).pipe(
      map(resp => {
        const v = resp[`data`];
        const reward = v[`reward`];
        const images = reward[`images`] || [];
        const thumbnailUrl = images.find((image: any) => image[`type`] === 'reward_thumbnail');
        const bannerUrl = images.find((image: any) => image[`type`] === 'reward_banner');
        const merchantLogoUrl = images.find((image: any) => image[`type`] === 'merchant_logo');
        const voucher = {
          id: v[`id`],
          state: v[`state`],
          name: v[`name`],
          code: v[`voucher_code`],
          description: reward[`description`],
          thumbnailUrl,
          bannerUrl,
          expiresAt: new Date(reward[`valid_to`]),
          merchantName: reward[`merchant_name`],
          merchantLogoUrl,
          termsAndConditions: reward[`terms_and_conditions`]
        };

        this.vouchers.push(voucher);

        return voucher;
      })
    );
  }
}
