import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders, HttpParams,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMerchantAdminService } from './imerchant-admin.service';
import {IMerchantAdminTransaction, IMerchantProfile} from './models/merchants-admin.model';

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

interface IV4MerchantUserInvitationResponse {
  data: IV4MerchantProfile;
}

interface IV4MerchantProfile {
  id: number;
  email: string;
  username: string;
  mobile: string;
  location_id: number;
  merchant_account_id: number;
  created_at: Date;
  updated_at: Date;
  password_changed_at: Date;
  state: string;
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

    return {
      id: v.id,
      reward: V4RewardsService.v4RewardToReward(reward),
      state: v.state,
      code: v.voucher_code,
      expiry: reward.valid_to !== null ? new Date(reward.valid_to) : null,
      redemptionDate: v.redemption_date !== null ? new Date(v.redemption_date) : null,
    };
  }

  public static v4MerchantProfileToMerchantProfile(profile: IV4MerchantProfile): IMerchantProfile {
    return {
      id: profile.id,
      email: profile.email,
      username: profile.username,
      mobile: profile.mobile,
      locationId: profile.location_id,
      merchantAccountId: profile.merchant_account_id,
      createdAt: new Date(profile.created_at),
      updatedAt: new Date(profile.updated_at),
      passwordChangedAt: new Date(profile.password_changed_at),
      state: profile.state
    };
  }

  public createTransaction(userId: number, merchantUsername: string, amount: number, currency: string,
                           type: string, reference: string, pharmacy: string, productName: string): Observable<IMerchantAdminTransaction> {

    const url = `${this.config.apiHost}/v4/merchant_admin/transactions`;
    const body = {
      user_account_id: userId,
      transaction_data: {
        transaction_type: type,
        transaction_reference: reference,
        amount,
        currency,
        properties: {
          merchant_username: merchantUsername,
          pharmacy,
          product: productName
        }
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

  public validateInvite(token: string, clientId: string): Observable<IMerchantProfile> {
    const params = new HttpParams()
      .set('invitation_token', token)
      .set('client_id', clientId);

    const url = `${this.config.apiHost}/v4/merchant_user_account_invitations/accept`;

    return this.http.get<IV4MerchantUserInvitationResponse>(url, {params}).pipe(
      map((res) => V4MerchantAdminService.v4MerchantProfileToMerchantProfile(res.data))
    );
  }
}
