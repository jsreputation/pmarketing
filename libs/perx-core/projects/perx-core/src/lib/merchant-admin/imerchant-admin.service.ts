import {Observable} from 'rxjs';
import {IMerchantAdminTransaction} from './models/merchants-admin.model';
import {IVoucher} from '../vouchers/models/voucher.model';

export abstract class IMerchantAdminService {
  public abstract createTransaction(userId: number, userName: string, amount: number, currency: string,
                                    type: string, reference: string): Observable<IMerchantAdminTransaction>;

  public abstract redeemVoucher(id: number): Observable<IVoucher>;

  public abstract issueVoucher(id: number, userId?: string): Observable<IVoucher>;
}
