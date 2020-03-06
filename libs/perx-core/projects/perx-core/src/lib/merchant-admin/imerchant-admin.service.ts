import { Observable } from 'rxjs';

import {
  IMerchantAdminTransaction,
  IMerchantProfile,
  IMerchantRewardTransactionHistory,
  IMerchantTransactionHistory,
  IResetPasswordData,
} from './models/merchants-admin.model';

import { IVoucher } from '../vouchers/models/voucher.model';
import { IMessageResponse } from '../perx-core.models';

export abstract class IMerchantAdminService {
  public abstract createTransaction(
    userId: number,
    merchantUsername: string,
    amount: number,
    currency: string,
    type: string,
    reference: string,
    pharmacy: string,
    productName: string
  ): Observable<IMerchantAdminTransaction>;

  public abstract redeemVoucher(id: number): Observable<IVoucher>;

  public abstract issueVoucher(id: number, userId?: string): Observable<IVoucher>;

  public abstract validateInvite(token: string, clientId: string): Observable<IMerchantProfile>;

  public abstract setupNewMerchantsPassword(token: string, clientId: string, password: string): Observable<string>;

  public abstract getMerchantProfile(): Observable<IMerchantProfile>;

  public abstract getTransactionHistory(page?: number, pageSize?: number, locale?: string): Observable<IMerchantTransactionHistory[]>;

  public abstract getRewardTransactionHistory(): Observable<IMerchantRewardTransactionHistory[]>;

  public abstract forgotPassword(email: string): Observable<IMessageResponse>;

  public abstract resetPassword(resetPasswordInfo: IResetPasswordData): Observable<IMessageResponse>;
}
