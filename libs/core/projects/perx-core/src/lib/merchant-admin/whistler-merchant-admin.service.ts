import { Injectable } from '@angular/core';

import {
  Observable,
  throwError,
} from 'rxjs';

import {
  IMerchantAdminTransaction,
  IMerchantProfile, IMerchantRewardTransactionHistory,
  IMerchantTransactionHistory,
  IResetPasswordData,
  IMerchantInvoice
} from './models/merchants-admin.model';
import { IMerchantAdminService } from './imerchant-admin.service';

import { IVoucher } from '../vouchers/models/voucher.model';
import { IMessageResponse } from '../perx-core.models';
import { IPosLoyaltyTransaction } from '../pos/models/pos.model';

@Injectable({
  providedIn: 'root'
})
export class WhistlerMerchantAdminService implements IMerchantAdminService {
  public createTransaction(
    // @ts-ignore
    userId: number,
    // @ts-ignore
    merchantUsername: string,
    // @ts-ignore
    amount: number,
    // @ts-ignore
    currency: string,
    // @ts-ignore
    type: string,
    // @ts-ignore
    reference: string,
    // @ts-ignore
    pharmacy: string,
    // @ts-ignore
    productName: string,
     // @ts-ignore
    merchantName?: string,
     // @ts-ignore
    description?: string
  ): Observable<IMerchantAdminTransaction> {
    throw new Error('createTransaction Method not implemented.');
  }

  // @ts-ignore
  public redeemVoucher(id: number, userId: string, reserve?: boolean): Observable<IVoucher> {
    throw new Error('redeemVoucher Method not implemented.');
  }

  // @ts-ignore
  public issueVoucher(id: number, userId: string): Observable<IVoucher> {
    throw new Error('issueVoucher Method not implemented.');
  }

  // @ts-ignore
  public revertVoucherRedemption(id: number, userId: string): Observable<IVoucher> {
    throw new Error('revertVoucherRedemption Method not implemented.');
  }

  // @ts-ignore
  public reservePoints(points: number, loyaltyProgramId: number, userId: string ): Observable<IPosLoyaltyTransaction> {
    throw new Error('reservePoints Method not implemented.');
  }

  // @ts-ignore
  public revertPoints(id: number, userId: string): Observable<number> {
    throw new Error('revertPoints Method not implemented.');
  }

  // @ts-ignore
  public createInvoice(userId: string, amount: number, receiptIdentifier: string, voucherId: number, pointsId: number, merchantName?: string
  ): Observable<IMerchantInvoice> {
    throw new Error('createInvoice Method not implemented.');
  }

  // @ts-ignore
  public validateInvite(token: string): Observable<IMerchantProfile> {
    throw new Error('validateInvite Method not implemented.');
  }

  // @ts-ignore
  public setupNewMerchantsPassword(token: string, password: string): Observable<string> {
    throw new Error('setupNewMerchantsPassword Method not implemented.');
  }

  public getMerchantProfile(): Observable<IMerchantProfile> {
    throw new Error('getMerchantProfile Method not implemented.');
  }


  public getTransactionHistory(
    // @ts-ignore
    page?: number, pageSize?: number, locale?: string,
    // @ts-ignore
    sortBy?: string, orderBy?: string): Observable<IMerchantTransactionHistory[]> {
    throw new Error('getTransactionHistory Method not implemented.');
  }

  public getRewardTransactionHistory(
    // @ts-ignore
    page?: number, pageSize?: number, locale?: string,
    // @ts-ignore
    sortBy?: string, orderBy?: string): Observable<IMerchantRewardTransactionHistory[]> {
    throw new Error('getRewardTransactionHistory Method not implemented.');
  }

  // @ts-ignore
  public forgotPassword(email: string): Observable<IMessageResponse> {
    return throwError('Not implement yet');
  }

  // @ts-ignore
  public resetPassword(resetPasswordInfo: IResetPasswordData): Observable<IMessageResponse> {
    return throwError('Not implement yet');
  }

  // @ts-ignore
  public getCustomerDetails(mobileNumber: number, identifier: string): Observable<IProfile> {
    throw new Error('Not implement yet');
  }

  // @ts-ignore
  public getCustomerLoyalties(userId: string, page: number = 1, pageSize: number = DEFAULT_PAGE_COUNT): Observable<ILoyalty[]> {
    throw new Error('Not implemented.');
  }

  // @ts-ignore
  public signUpNewUser(mobileNumber: string): Observable<IProfile> {
    throw new Error('Not implemented.');
  }
}
