import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IVoucher, VOUCHER_STATE, REDEMPTION_TYPE } from './models/voucher.model';
import { map, tap, flatMap, mergeAll, scan } from 'rxjs/operators';
import { IVoucherService } from './ivoucher.service';

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
}

interface IV4Voucher {
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
    type: REDEMPTION_TYPE;
  };
  reservation_expires_at: any;
  reward?: IV4Reward;
  state: VOUCHER_STATE;
  valid_from: string;
  valid_to: string;
  voucher_code: any;
  voucher_key: any;
  voucher_type: string;
  redemption_image?: any;
  redemption_text?: any;
  merchantImg?: any;
}

@Injectable({
  providedIn: 'root'
})
export class VouchersService implements IVoucherService {
  private vouchers: IVoucher[] = [];

  constructor(
    private http: HttpClient,
    @Inject('config') private config: any
  ) {
  }

  public static voucherToVoucher(v: IV4Voucher): IVoucher {
    const reward = v.reward;
    const images: IV4Image[] = reward.images || [];
    let thumbnail: IV4Image = images.find((image: IV4Image) => image.type === 'reward_thumbnail');
    if (thumbnail === undefined) {
      thumbnail = images.find((image: IV4Image) => image.type === 'reward_logo');
    }
    const thumbnailImg = thumbnail && thumbnail.url;
    const banner: IV4Image = images.find((image: IV4Image) => image.type === 'reward_banner');
    const rewardBanner = banner && banner.url;
    const merchantImg = v.merchantImg ? v.merchantImg : null;
    const redemptionSuccessTxt = v.redemption_text ? v.redemption_text : null;
    const redemptionSuccessImg = v.redemption_image ? v.redemption_image : null;

    return {
      id: v.id,
      rewardId: reward.id,
      state: v.state,
      name: v.name,
      code: v.voucher_code,
      redemptionType: v.redemption_type.type,
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
      redemptionSuccessImg
    };
  }

  public getAll(): Observable<IVoucher[]> {
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

  public getAllFromPage(page: number): Observable<IV4Voucher[]> {
    return this.http.get<IV4VouchersResponse>(`${this.vouchersUrl}&page=${page}`)
      .pipe(
        map(res => res.data)
      );
  }

  get vouchersUrl(): string {
    return `${this.config.env.apiHost}/v4/vouchers?redeemed_within=-1&expired_within=-1`;
  }

  public get(id: number): Observable<IVoucher> {
    const found = this.vouchers.find(v => {
      return `${v.id}` === `${id}`;
    });
    if (found) {
      return of(found);
    }
    const url = `${this.config.env.apiHost}/v4/vouchers/${id}`;
    return this.http.get<IV4VoucherResponse>(url).pipe(
      map(resp => resp.data),
      map((v: IV4Voucher) => {
        const voucher = VouchersService.voucherToVoucher(v);
        return voucher;
      })
    );
  }

  public redeemVoucher(id: number): Observable<any> {
    const url = `${this.config.env.apiHost}/v4/vouchers/${id}/redeem`;

    return this.http.post(url, null, {}).pipe(
      tap(_ => {
        this.vouchers = [];
      })
    );
  }

  // resets the current cache to a new list or by default nothing, and it will filled during the next call to getAll
  public reset(vouchers: IVoucher[] = []): void {
    this.vouchers = vouchers;
  }
}
