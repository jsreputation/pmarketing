import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMerchantAdminService } from './imerchant-admin.service';
import { IMerchantAdminTransaction } from './models/merchants-admin.model';

import { Config } from '../config/config';
import {
  IV4Reward,
  V4RewardsService,
} from '../rewards/v4-rewards.service';
import {
  IVoucher,
  RedemptionType,
  VoucherState,
} from '../vouchers/models/voucher.model';

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

interface IV4Image {
  type: string;
  url: string;
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

  public static v4TransactionToTransaction(transaction: IV4MerchantAdminTransaction): IMerchantAdminTransaction {
    return {
      id: transaction.id,
      user_account_id: transaction.user_account_id,
      updated_at: new Date(transaction.updated_at),
      transaction_type: transaction.transaction_type,
      amount: transaction.amount,
      transaction_date: new Date(transaction.transaction_date),
      currency: transaction.currency,
      workflow_id: transaction.workflow_id,
      created_at: new Date(transaction.created_at),
      properties: transaction.properties,
      transaction_reference: transaction.transaction_reference
    };
  }

  public static v4VoucherToVoucher(v: IV4MerchantAdminVoucher): IVoucher {
    const reward: IV4Reward = v.reward;
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
      reward: V4RewardsService.v4RewardToReward(reward),
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
  public createTransaction(userId: number, amount: number, currency: string,
                           type: string, reference: string): Observable<IMerchantAdminTransaction> {

    const url = `${this.config.apiHost}/v4/merchant_admin/transactions`;
    const body = {
      user_account_id: userId,
      transaction_data: {
        transaction_type: type,
        transaction_reference: reference,
        amount,
        currency
      }
    };

    return this.http.post<IV4CreateTransactionResponse>(url, body).pipe(
      map((res) => V4MerchantAdminService.v4TransactionToTransaction(res.data))
    );

  }

  public redeemVoucher(id: number): Observable<IVoucher> {
    const url = `${this.config.apiHost}/v4/merchant_admin/vouchers/${id}/redeem`;

    return this.http.put<IV4RedeemVoucherResponse>(url, null).pipe(
        map((res) => V4MerchantAdminService.v4VoucherToVoucher(res.data))
      );
  }

  public issueVoucher(id: number, userId: string = ''): Observable<IVoucher> {
    const headers = new HttpHeaders().set('user-id', userId);

    const url = `${this.config.apiHost}/v4/merchant_admin/rewards/${id}/issue`;

    return this.http.post<IV4RedeemVoucherResponse>(url, null, { headers }).pipe(
        map((res) => V4MerchantAdminService.v4VoucherToVoucher(res.data))
      );
  }

}
