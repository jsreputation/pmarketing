import { Observable } from 'rxjs';

import {
  IMerchantAdminTransaction,
  IMerchantProfile,
  IMerchantRewardTransactionHistory,
  IMerchantTransactionHistory,
  IResetPasswordData,
  IMerchantInvoice,
} from './models/merchants-admin.model';

import { IVoucher } from '../vouchers/models/voucher.model';
import { IMessageResponse } from '../perx-core.models';
import { IProfile } from '../profile/profile.model';
import { IPosLoyaltyTransaction } from '../pos/models/pos.model';
import { ILoyalty } from '../loyalty/models/loyalty.model';
export abstract class IMerchantAdminService {
  public abstract createTransaction(
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
  ): Observable<IMerchantAdminTransaction>;

  public abstract redeemVoucher(id: number, userId: string, reserve?: boolean): Observable<IVoucher>;

  public abstract issueVoucher(
    id: number,
    userId?: string,
  ): Observable<IVoucher>;

  public abstract revertVoucherRedemption(id: number, userId: string): Observable<IVoucher>;

  public abstract validateInvite(token: string): Observable<IMerchantProfile>;

  public abstract reservePoints(points: number, loyaltyProgramId: number, userId: string ): Observable<IPosLoyaltyTransaction>;

  public abstract revertPoints(id: number, userId: string): Observable<number>;

  public abstract createInvoice(
    userId: string,
    amount: number,
    receiptIdentifier: string,
    voucherId: number,
    pointsId: number,
    merchantName?: string
  ): Observable<IMerchantInvoice>;

  public abstract setupNewMerchantsPassword(
    token: string,
    password: string,
  ): Observable<string>;

  public abstract getMerchantProfile(): Observable<IMerchantProfile>;

  public abstract getTransactionHistory(
    page?: number,
    pageSize?: number,
    locale?: string,
    sortBy?: string,
    orderBy?: string,
  ): Observable<IMerchantTransactionHistory[]>;

  public abstract getRewardTransactionHistory(
    page?: number,
    pageSize?: number,
    locale?: string,
    sortBy?: string,
    orderBy?: string
  ): Observable<IMerchantRewardTransactionHistory[]>;

  public abstract forgotPassword(email: string): Observable<IMessageResponse>;

  public abstract resetPassword(
    resetPasswordInfo: IResetPasswordData,
  ): Observable<IMessageResponse>;

  public abstract getCustomerDetails(mobileNumber: number, identifier: string): Observable<IProfile>;

  public abstract getCustomerLoyalties(userId: string, page?: number, pageSize?: number, locale?: string): Observable<ILoyalty[]>;

  public abstract signUpNewUser(mobileNumber: string): Observable<IProfile>;

}
