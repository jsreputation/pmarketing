import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IVoucher } from './models/voucher.model';
import { map } from 'rxjs/operators';

const vs = [
  {
    id: 1,
    state: 'issued',
    name: 'Venti Caffe Latte',
    img: 'https://picsum.photos/200',
    description: 'Starbucks',
    expiresAt: '04 Feb 2019'
  },
  {
    id: 2,
    state: 'issued',
    name: '100g Cookies',
    img: 'https://picsum.photos/200',
    description: 'Famous Amos',
    expiresAt: '04 Feb 2019'
  },
  {
    id: 3,
    state: 'issued',
    name: '100g Cookies',
    img: 'https://picsum.photos/200',
    description: 'Famous Amos',
    expiresAt: '04 Feb 2019'
  },
  {
    id: 4,
    state: 'redeemed',
    name: '100g Cookies',
    img: 'https://picsum.photos/200',
    description: 'Famous Amos',
    expiresAt: '04 Feb 2019'
  },
  {
    id: 5,
    state: 'redeemed',
    name: '100g Cookies',
    img: 'https://picsum.photos/200',
    description: 'Famous Amos',
    expiresAt: '04 Feb 2019'
  }
];

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
          const voucher = {
            id: v[`id`],
            state: v[`state`],
            name: v[`name`],
            code: v[`voucher_code`],
            description: reward[`description`],
            bannerUrl: reward[`images`][0][`url`],
            expiresAt: new Date(reward[`valid_to`]),
            merchantName: reward[`merchant_name`],
            merchantLogoUrl: reward[`images`][1][`url`]
          };
          return voucher;
        });
        return this.vouchers;
      })
    );
  }

  get(id: string|number): Observable<IVoucher> {
    const vouchers = this.vouchers.filter(v => {
      return `${v.id}` === `${id}`;
    });
    if (vouchers && vouchers.length > 0) {
      return of(vouchers[0]);
    }

    const url = `${this.config.env.apiHost}/v4/vouchers/${id}`;
    return this.http.get(url).pipe(
      map(resp => {
        const v = resp[`data`];
        const reward = v[`reward`];
        const voucher = {
          id: v[`id`],
          state: v[`state`],
          name: v[`name`],
          code: v[`voucher_code`],
          description: reward[`description`],
          bannerUrl: reward[`images`][0][`url`],
          expiresAt: new Date(reward[`valid_to`]),
          merchantName: reward[`merchant_name`],
          merchantLogoUrl: reward[`images`][1][`url`]
        };

        this.vouchers.push(voucher);

        return voucher;
      })
    );
  }
}
