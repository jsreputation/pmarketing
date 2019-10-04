import { Injectable } from '@angular/core';
import { IMerchantAdminService } from './imerchant-admin.service';
import { Observable, of } from 'rxjs';
import { IMerchantAdminTransaction } from './models/merchants-admin.model';
import { IVoucher, RedemptionType, VoucherState } from '../vouchers/models/voucher.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Config } from '../config/config';

interface IV4MerchantAdminTransaction {
  id: number;
  user_account_id: number;
  updated_at: string;
  transaction_type: string;
  amount: number;
  transaction_date: string;
  currency: string;
  workflow_id?: number | null;
  created_at: string;
  properties?: string | null;
  transaction_reference: string;
}

interface IV4CreateTransactionResponse {
  data: IV4MerchantAdminTransaction;
}

interface IV4MerchantAdminVoucher {
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
  reward?: IV4MerchantAdminReward;
  state: VoucherState;
  valid_from: string;
  valid_to: string;
  voucher_code: any;
  voucher_key: any;
  voucher_type: RedemptionType;
  redemption_image?: any;
  redemption_text?: any;
}

interface IV4MerchantAdminReward {
  name: string;
  favourite: boolean;
  merchant_id: number;
  merchant_website: string;
  alt_merchant_name: string;
  alt_merchant_website: string;
  alt_merchant_text: string;
  ecommerce_only: boolean;
  brands: string[];
  subtitle: string;
  valid_from: string;
  selling_from: string;
  selling_to: string;
  eligible: boolean;
  distance: {
    value: string,
    unit_of_measure: string
  };
  inventory: IV4Inventory;
  reward_price: IV4RewardPrice[];
  custom_fields: any;
  loyalty: any;
  terms_and_conditions: string;
  social_handlers: {
    facebook: string;
    twitter: string;
  };
  tags: string[];
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
  is_giftable: boolean;
  is_favorite: boolean;
}

interface IV4Image {
  type: string;
  url: string;
}

interface IV4Inventory {
  reward_total_limit: number;
  reward_total_balance: number;
  minutes_per_period: number;
  period_start: number;
  reward_limit_per_period: number;
  reward_limit_per_period_balance: number;
  reward_limit_per_user: number;
  reward_limit_per_user_balance: number;
  minutes_per_user_per_period: number;
  per_user_period_start: number;
  reward_limit_per_user_per_period: number;
  reward_limit_per_user_period_balance: number;
}

interface IV4RewardPrice {
  id: number;
  identifier: string;
  currency_code: string;
  price: string;
  points: number;
  reward_currency: string;
  reward_amount: string;
}

interface IV4RedeemVoucherResponse {
  data: IV4MerchantAdminVoucher;
  meta: {
    count: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class V4MerchantAdminService implements IMerchantAdminService {

  constructor(private http: HttpClient, private config: Config) {}

  public static v4TransactionToTransaction(transaction: IV4CreateTransactionResponse): IMerchantAdminTransaction {
    return {
      id: transaction.data.id,
      user_account_id: transaction.data.user_account_id,
      updated_at: new Date(transaction.data.updated_at),
      transaction_type: transaction.data.transaction_type,
      amount: transaction.data.amount,
      transaction_date: new Date(transaction.data.transaction_date),
      currency: transaction.data.currency,
      workflow_id: transaction.data.workflow_id,
      created_at: new Date(transaction.data.created_at),
      properties: transaction.data.properties,
      transaction_reference: transaction.data.transaction_reference
    };
  }

  public static v4VoucherToVoucher(v: IV4MerchantAdminVoucher): IVoucher {
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
  public createTransaction(): Observable<IMerchantAdminTransaction> {
    const response: IV4CreateTransactionResponse = {
        data: {
            id: 700,
            user_account_id: 5852,
            updated_at: '2019-09-12T09:07:21.283Z',
            transaction_type: 'some_cool_type',
            amount: 400,
            transaction_date: '2019-09-12T09:07:21.272Z',
            currency: 'HKD',
            workflow_id: null,
            created_at: '2019-09-12T09:07:21.283Z',
            properties: null,
            transaction_reference: 'some_cool_reference'
        }
    };

    const transaction = V4MerchantAdminService.v4TransactionToTransaction(response);
    return of(transaction);
  }

  public redeemVoucher(id: number): Observable<IVoucher> {
    const url = `${this.config.apiHost}/v4/merchant_admin/vouchers/${id}/redeem`;

    return this.http.put<IV4RedeemVoucherResponse>(url, null).pipe(
        map((res) => V4MerchantAdminService.v4VoucherToVoucher(res.data))
      );
  }

  public issueVoucher(id: number): Observable<IVoucher> {
    const url = `${this.config.apiHost}/v4/merchant_admin/rewards/${id}/issue`;

    return this.http.post<IV4RedeemVoucherResponse>(url, null).pipe(
        map((res) => V4MerchantAdminService.v4VoucherToVoucher(res.data))
      );
  }

}
