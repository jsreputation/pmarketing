import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import {
  Observable,
  of,
} from 'rxjs';

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
    const reward: IV4Reward = v.reward;

    return {
      id: v.id,
      reward: V4RewardsService.v4RewardToReward(reward),
      state: v.state,
      code: v.voucher_code,
      expiry: reward.valid_to !== null ? new Date(reward.valid_to) : null,
      redemptionDate: v.redemption_date !== null ? new Date(v.redemption_date) : null,
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

    // TODO: use the following url once API is created
    // @ts-ignore
    const url = `${this.config.apiHost}/v4/merchant_admin/vouchers/${id}/redeem`;

    return this.http.get<IV4RedeemVoucherResponse>(
      'assets/redeem.json'
      ).pipe(
        map((res) => V4MerchantAdminService.v4VoucherToVoucher(res.data))
      );
  }

  public issueVoucher(id: number): Observable<IVoucher> {

    // TODO: use the following url once API is created
    // @ts-ignore
    const url = `${this.config.apiHost}/v4/merchant_admin/rewards/${id}/issue`;

    return this.http.get<IV4RedeemVoucherResponse>(
      'assets/issue.json'
      ).pipe(
        map((res) => V4MerchantAdminService.v4VoucherToVoucher(res.data))
      );
  }

}
