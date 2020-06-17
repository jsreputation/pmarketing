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
} from './models/merchants-admin.model';
import { IMerchantAdminService } from './imerchant-admin.service';

import { IVoucher } from '../vouchers/models/voucher.model';
import { IMessageResponse } from '../perx-core.models';

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
    productName: string
  ): Observable<IMerchantAdminTransaction> {
    throw new Error('createTransaction Method not implemented.');
  }

  // @ts-ignore
  public redeemVoucher(id: number): Observable<IVoucher> {
    throw new Error('redeemVoucher Method not implemented.');
  }

  // @ts-ignore
  public issueVoucher(id: number, userId: string): Observable<IVoucher> {
    throw new Error('issueVoucher Method not implemented.');
  }

  // @ts-ignore
  public validateInvite(token: string, clientId: string): Observable<IMerchantProfile> {
    throw new Error('validateInvite Method not implemented.');
  }

  // @ts-ignore
  public setupNewMerchantsPassword(token: string, clientId: string, password: string): Observable<string> {
    throw new Error('setupNewMerchantsPassword Method not implemented.');
  }

  public getMerchantProfile(): Observable<IMerchantProfile> {
    throw new Error('getMerchantProfile Method not implemented.');
  }

  // @ts-ignore
  public getTransactionHistory(page?: number, pageSize?: number, locale?: string,
                               // @ts-ignore
                               sortBy?: string, orderBy?: string,): Observable<IMerchantTransactionHistory[]> {
    throw new Error('getTransactionHistory Method not implemented.');
  }

  // @ts-ignore
  public getRewardTransactionHistory(page?: number, pageSize?: number, locale?: string): Observable<IMerchantRewardTransactionHistory[]> {
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
}
