import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders, HttpParams,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { oc } from 'ts-optchain';

import { IMerchantAdminService } from './imerchant-admin.service';
import {
  IMerchantAdminTransaction,
  IMerchantProfile,
  IMerchantAccount,
  // IMerchantTransactionHistory,
  IMerchantCustomProperties,
  // MerchantTransactionDetailType,
  IMerchantPurchaseTransactionHistory,
  IMerchantRewardTransactionHistory,
  IResetPasswordData,
  IMerchantInvoice,
  MerchantTransactionItemType
} from './models/merchants-admin.model';

import {
  IV4Reward,
  V4RewardsService,
  // IV4Tag,
} from '../rewards/v4-rewards.service';
import {
  IVoucher,
  VoucherState,
} from '../vouchers/models/voucher.model';
import {
  IMessageResponse,
  RedemptionType,
} from '../perx-core.models';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { IProfile } from '../profile/profile.model';
import { V4ProfileService, IV4ProfileResponse } from '../profile/v4-profile.service';
import { V4PosService, IV4PosLoyaltyTransactionResponse } from '../pos/v4-pos.service';
import { IPosLoyaltyTransaction } from '../pos/models/pos.model';
import { V4LoyaltyService, IV4GetLoyaltiesResponse, IV4Loyalty } from '../loyalty/v4-loyalty.service';
import { ILoyalty } from '../loyalty/models/loyalty.model';
import { Cacheable } from 'ngx-cacheable';

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

interface IV4RevertPointsResponse {
  data: {
    id: number;
  };
}

interface IV4MerchantAccount {
  id: number;
  customer_id: number | null;
  name: string;
  state: string;
  logo: string | null;
  url: string | null;
  type: string | null;
  favourite: string | null;
  is_featured: boolean;
  tags: IV4MerchantTag[];
}

interface IV4MerchantTag {
  id: number;
  name: string;
}

interface IV4MerchantProfile {
  id: number;
  email: string;
  username: string;
  mobile: string;
  location_id: number;
  merchant_account_id: number;
  merchant_account: IV4MerchantAccount;
  created_at: Date;
  updated_at: Date;
  password_changed_at: Date;
  state: string;
}

interface IV4MerchantPurchaseTransactionHistory {
  id: number;
  user_account_id: number;
  updated_at: Date;
  transaction_type: string;
  amount: number;
  transaction_date: Date;
  currency: string;
  workflow_id?: number;
  created_at: Date;
  properties?: IMerchantCustomProperties;
  transaction_reference: string;
  points_earned: number;
}

interface IV4MerchantRewardTransactionHistory {
  id: number;
  created_at: Date;
  issued_date: Date;
  redemption_date: Date;
  updated_at: Date;
  customer_name: string;
  merchant_name: string;
  reward_name: string;
  voucher_code: string;
}

interface IV4MerchantInvoice {
  id: number;
  identifier: string;
  collected_amount: number;
  description: string;
  invoice_items: IV4MerchantInvoiceItems[];
}

interface IV4MerchantInvoiceItems {
  id?: number;
  item_id: number;
  item_type: string;
}

// interface IV4MerchantTransactionHistory {
//   id: number;
//   name: string;
//   identifier: string;
//   transacted_at: Date;
//   amount: number;
//   transacted_cents?: number; // property will probably be removed
//   properties: IMerchantCustomProperties;
//   transaction_details: {
//     type: MerchantTransactionDetailType;
//     data: IV4MerchantPurchaseTransactionHistory | IV4MerchantRewardTransactionHistory;
//   };
// }

interface IV4MerchantTransactionHistoryResponse {
  data: IV4MerchantPurchaseTransactionHistory[];
}

interface IV4MerchantRewardHistoryResponse {
  data: IV4MerchantRewardTransactionHistory[];
}

interface IV4MerchantInvoiceResponse {
  data: IV4MerchantInvoice;
}

const DEFAULT_PAGE_COUNT: number = 10;

@Injectable({
  providedIn: 'root'
})
export class V4MerchantAdminService implements IMerchantAdminService {
  public apiHost: string;
  private merchantEndPoint: string | null = null;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.apiHost = config.apiHost as string;
        if (!config.production) {
          this.merchantEndPoint = 'http://localhost:4000/v4/merchant_admin';
        } else {
          this.merchantEndPoint = `${config.baseHref}v4/merchant_admin`;
        }
      }
    );
  }

  public static v4PurchaseTransactionHistoryToPurchaseTransactionHistory(
    transactionHistory: IV4MerchantPurchaseTransactionHistory): IMerchantPurchaseTransactionHistory {

    const purchaseProperties = oc(transactionHistory).properties() as {
      merchant_username: string;
      pharmacy: string;
      product: string;
      description: string;
      merchant_name: string;
    };
    return {
      id: transactionHistory.id,
      productName: oc(purchaseProperties).product(),
      pharmacyName: oc(purchaseProperties).pharmacy(),
      issuerName: oc(purchaseProperties).merchant_username(),
      transactionDate: transactionHistory.transaction_date,
      transactionRef: transactionHistory.transaction_reference,
      price: transactionHistory.amount,
      currency: transactionHistory.currency,
      pointsIssued: transactionHistory.points_earned,
      description: purchaseProperties?.description,
      merchantName: purchaseProperties?.merchant_name
    };
  }

  public static v4RewardTransactionHistoryToRewardTransactionHistory(
    transaction: IV4MerchantRewardTransactionHistory
  ): IMerchantRewardTransactionHistory {
    return {
      id: transaction.id,
      issuedDate: transaction.issued_date,
      userAccount: transaction.merchant_name,
      customerName: transaction.customer_name,
      rewardName: transaction.reward_name,
      redemptionDate: transaction.redemption_date
    };
  }

  public static v4TransactionToTransaction(transaction: IV4MerchantAdminTransaction): IMerchantAdminTransaction {
    return {
      id: transaction.id,
      userAccountId: transaction.user_account_id,
      updatedAt: new Date(transaction.updated_at),
      transactionType: transaction.transaction_type,
      amount: transaction.amount,
      transactionDate: new Date(transaction.transaction_date),
      currency: transaction.currency,
      workflowId: transaction.workflow_id,
      createdAt: new Date(transaction.created_at),
      properties: transaction.properties,
      transactionReference: transaction.transaction_reference
    };
  }

  public static v4InvoiceToInvoice(invoice: IV4MerchantInvoice): IMerchantInvoice {

    const loyaltyItem =  invoice?.invoice_items.find((item: IV4MerchantInvoiceItems) =>
     item.item_type === MerchantTransactionItemType.point);
    const voucherItem =  invoice?.invoice_items.find((item: IV4MerchantInvoiceItems) =>
     item.item_type === MerchantTransactionItemType.reward);
    const transaction = invoice?.invoice_items.find((item: IV4MerchantInvoiceItems) =>
     item.item_type === MerchantTransactionItemType.transaction);

    return {
      id: invoice.id,
      identifier: invoice.identifier,
      description: invoice.description,
      pointId: loyaltyItem ? loyaltyItem.item_id : null,
      voucherId: voucherItem ? voucherItem.item_id : null,
      transactionId: transaction ? transaction.item_id : null
    };
  }

  public static v4VoucherToVoucher(v: IV4MerchantAdminVoucher): IVoucher {
    const reward: (IV4Reward | undefined) = v.reward; // this is a opt property according to the interface

    return {
      id: v.id,
      reward: reward ? V4RewardsService.v4RewardToReward(reward) : null,
      state: v.state,
      code: v.voucher_code,
      expiry: (reward && reward.valid_to !== null) ? new Date(reward.valid_to) : null,
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
      merchantAccount: (profile.merchant_account as unknown as IMerchantAccount),
      createdAt: new Date(profile.created_at),
      updatedAt: new Date(profile.updated_at),
      state: profile.state
    };
  }

  public createTransaction(
    userId: number,
    merchantUsername: string,
    amount: number,
    currency: string,
    type: string,
    reference: string,
    pharmacy: string,
    productName: string,
    merchantName?: string,
    description?: string
  ): Observable<IMerchantAdminTransaction> {
    const url = `${this.apiHost}/v4/merchant_admin/transactions`;
    const body = {
      user_account_id: userId,
      transaction_data: {
        transaction_type: type,
        transaction_reference: reference,
        amount,
        currency,
        properties: {
          ...(merchantUsername && { merchant_username: merchantUsername }),
          ... (pharmacy && { pharmacy }),
          ...(productName && {product: productName}),
          ...(merchantName && { merchant_name: merchantName }),
          ...(description && { description })
        }
      }
    };

    return this.http.post<IV4CreateTransactionResponse>(url, body).pipe(
      map((res) => V4MerchantAdminService.v4TransactionToTransaction(res.data))
    );

  }

  public redeemVoucher(id: number, userId: string, reserve?: boolean): Observable<IVoucher> {
    const headers = new HttpHeaders().set('user-id', userId);
    const url = `${this.apiHost}/v4/merchant_admin/vouchers/${id}/redeem`;
    let body;
    if (reserve) {
      body = {
        confirm: false
      };
    }
    return this.http.put<IV4RedeemVoucherResponse>(url, (body ? body : null ), { headers }).pipe(
      map((res) => V4MerchantAdminService.v4VoucherToVoucher(res.data))
    );
  }

  public issueVoucher(id: number, userId: string = ''): Observable<IVoucher> {
    const headers = new HttpHeaders().set('user-id', userId);

    const url = `${this.apiHost}/v4/merchant_admin/rewards/${id}/issue`;

    return this.http.post<IV4RedeemVoucherResponse>(url, null, { headers }).pipe(
      map((res) => V4MerchantAdminService.v4VoucherToVoucher(res.data))
    );
  }

  public revertVoucherRedemption(id: number, userId: string): Observable<IVoucher> {

    const headers = new HttpHeaders().set('user-id', userId);
    const url = `${this.apiHost}/v4/merchant_admin/vouchers/${id}/revert_redemption`;

    return this.http.put<IV4RedeemVoucherResponse>(url, null, { headers }).pipe(
      map((res) => V4MerchantAdminService.v4VoucherToVoucher(res.data))
    );
  }

  public reservePoints(points: number, loyaltyProgramId: number, userId: string ): Observable<IPosLoyaltyTransaction> {
    const headers = new HttpHeaders().set('user-id', userId);
    const url = `${this.apiHost}/v4/merchant_admin/loyalty_transactions/reserve`;
    const body = {
      amount_to_deduct: points,
      loyalty_program_id: loyaltyProgramId
    };
    return this.http.post<IV4PosLoyaltyTransactionResponse>(url, body, {headers}).pipe(
      map((res) => V4PosService.v4PosTransactionToPosTransaction(res.data))
    );
  }

  public revertPoints(id: number, userId: string): Observable<number> {
    const headers = new HttpHeaders().set('user-id', userId);
    const url = `${this.apiHost}/v4/merchant_admin/loyalty_transactions/${id}/revert_redemption`;

    return this.http.put<IV4RevertPointsResponse>(url, null, {headers}).pipe(
      map((res) => res.data.id)
    );
  }

  public createInvoice(
    userId: string,
    amount: number,
    receiptIdentifier: string,
    voucherId: number,
    pointsId: number,
    merchantName?: string
  ): Observable<IMerchantInvoice> {

    const headers = new HttpHeaders().set('user-id', userId);
    const url = `${this.apiHost}/v4/merchant_admin/invoices`;
    const usedItems: IV4MerchantInvoiceItems[] = [];

    if (voucherId) {
      usedItems.push({
        item_id: voucherId,
        item_type: MerchantTransactionItemType.reward
      });
    }

    if (pointsId) {
      usedItems.push({
        item_id: pointsId,
        item_type: MerchantTransactionItemType.point
      });
    }

    const body = {
      collected_amount: amount,
      identifier: receiptIdentifier,
      used_items: usedItems,
      transaction_properties: {
        ...(merchantName && { merchant_name: merchantName })
      }
    };

    return this.http.post<IV4MerchantInvoiceResponse>(url, body, {headers}).pipe(
      map((res) => V4MerchantAdminService.v4InvoiceToInvoice(res.data))
    );

  }

  public validateInvite(token: string): Observable<IMerchantProfile> {
    const params = new HttpParams()
      .set('invitation_token', token)
    const url = `${this.merchantEndPoint}/merchant_user_account_invitations/accept`;

    return this.http.get<IV4MerchantUserInvitationResponse>(url, { params }).pipe(
      map((res) => V4MerchantAdminService.v4MerchantProfileToMerchantProfile(res.data))
    );
  }

  public setupNewMerchantsPassword(token: string, password: string): Observable<string> {

    const body = {
      invitation_token: token,
      password,
      password_confirmation: password,
    };

    const url = `${this.merchantEndPoint}/merchant_user_account_invitations`;

    return this.http.put(url, body).pipe(
      // response is always HTTP 200 in this format regardless if it is a error or success and backend should resolve this
      // @ts-ignore
      map((res) => res.message)
    );
  }

  public getMerchantProfile(): Observable<IMerchantProfile> {
    const url = `${this.apiHost}/v4/merchant_admin/me`;
    return this.http.get<IV4MerchantUserInvitationResponse>(url).pipe(
      map((res) => V4MerchantAdminService.v4MerchantProfileToMerchantProfile(res.data)
      ));
  }

  public getTransactionHistory(
    page: number = 1,
    pageSize: number = 10,
    locale: string = 'en',
    sortBy: string = 'transaction_at', // sort_by=[transaction_at|id|transaction_date|transaction_type|amount]
    orderBy: string = 'desc', //  [asc, desc]
  ): Observable<IMerchantPurchaseTransactionHistory[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    return this.http.get<IV4MerchantTransactionHistoryResponse>(
      `${this.apiHost}/v4/merchant_admin/transactions_history`,
      {
        headers,
        params: {
          page: `${page}`,
          size: `${pageSize}`,
          sort_by: `${sortBy}`,
          order_by: `${orderBy}`
        }
      }
    ).pipe(
      map((res: IV4MerchantTransactionHistoryResponse) => res.data),
      map((transactionHistories: IV4MerchantPurchaseTransactionHistory[]) => transactionHistories.map(
        (transactionHistory: IV4MerchantPurchaseTransactionHistory) =>
          V4MerchantAdminService.v4PurchaseTransactionHistoryToPurchaseTransactionHistory(transactionHistory)
      ))
    );
  }

  public getRewardTransactionHistory(
    page: number = 1,
    pageSize: number = 10,
    locale: string = 'en',
    sortBy: string = 'redemption_date',
    orderBy: string = 'desc',
  ): Observable<IMerchantRewardTransactionHistory[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    const url = `${this.apiHost}/v4/merchant_admin/reward_transactions?state=redeemed`;
    return this.http.get<IV4MerchantRewardHistoryResponse>(
      url,
      {
        headers,
        params: {
          page: `${page}`,
          size: `${pageSize}`,
          sort_by: `${sortBy}`,
          order_by: `${orderBy}`
        }
      }
    ).pipe(
      map((res: IV4MerchantRewardHistoryResponse) => res.data),
      map((transactionHistories: IV4MerchantRewardTransactionHistory[]) => transactionHistories.map(
        (transactionHistory: IV4MerchantRewardTransactionHistory) =>
          V4MerchantAdminService.v4RewardTransactionHistoryToRewardTransactionHistory(transactionHistory)
      ))
    );
  }

  public forgotPassword(email: string): Observable<IMessageResponse> {
    return this.http.post<IMessageResponse>(`${this.merchantEndPoint}/forgot_password`, { email });
  }

  public resetPassword(resetPasswordInfo: IResetPasswordData): Observable<IMessageResponse> {
    return this.http.post<IMessageResponse>(
      `${this.apiHost}/v4/merchant_admin/reset_password`,
      {
        client_id: resetPasswordInfo.clientId,
        reset_password_token: resetPasswordInfo.resetPasswordToken,
        password: resetPasswordInfo.password,
      }
    );
  }

  public getCustomerDetails(mobileNumber: number, identifier: string): Observable<IProfile> {
    let params;
    if (mobileNumber) {
      params = { phone: `${mobileNumber}` };
    } else if (identifier) {
      params = { identifier: `${identifier}` };
    }
    const url = `${this.apiHost}/v4/merchant_admin/user_accounts/search`;
    return this.http.get<IV4ProfileResponse>(url, { params }).pipe(
      map((res) => V4ProfileService.v4ProfileToProfile(res.data))
    );
  }

  @Cacheable({
    maxAge: 300000
  })
  public getCustomerLoyalties(userId: string, page: number = 1, pageSize: number = DEFAULT_PAGE_COUNT,
                              locale: string = 'en'): Observable<ILoyalty[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale).set('user-id', userId);
    return this.http.get<IV4GetLoyaltiesResponse>(
      `${this.apiHost}/v4/merchant_admin/loyalty`,
      {
        headers,
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IV4GetLoyaltiesResponse) => res.data),
      map((loyalties: IV4Loyalty[]) => loyalties.map(
        (loyalty: IV4Loyalty) => V4LoyaltyService.v4LoyaltyToLoyalty(loyalty)
      ))
    );
  }

  public signUpNewUser(mobileNumber: string): Observable<IProfile> {

    const body = {
      phone: mobileNumber
    };

    const url = `${this.apiHost}/v4/merchant_admin/user_account_invitations`;
    return this.http.post<IV4ProfileResponse>(url, body).pipe(
      map((res) => V4ProfileService.v4ProfileToProfile(res.data))
    );
  }
}
