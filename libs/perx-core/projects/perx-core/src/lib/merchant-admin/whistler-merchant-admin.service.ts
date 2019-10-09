import {Injectable} from '@angular/core';
import {IMerchantAdminService} from './imerchant-admin.service';
import {Observable} from 'rxjs';
import {IMerchantAdminTransaction} from './models/merchants-admin.model';
import {IVoucher} from '../vouchers/models/voucher.model';

@Injectable({
  providedIn: 'root'
})
export class WhistlerMerchantAdminService implements IMerchantAdminService {

  // @ts-ignore
  public createTransaction(userId: number, merchantUsername: string, amount: number, currency: string,
                           // @ts-ignore
                           type: string, reference: string): Observable<IMerchantAdminTransaction> {
    throw new Error(`createTransaction Method not implemented.`);
  }

  // @ts-ignore
  public redeemVoucher(id: number): Observable<IVoucher> {
    throw new Error(`redeemVoucher Method not implemented.`);
  }

  // @ts-ignore
  public issueVoucher(id: number, userId: string): Observable<IVoucher> {
    throw new Error(`issueVoucher Method not implemented.`);
  }
}
