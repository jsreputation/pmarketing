import { Observable } from 'rxjs';
import { IMerchantAdminTransaction } from './models/merchants-admin.model';
import { IVoucher } from '../vouchers/models/voucher.model';

export abstract class IMerchantAdminService {
    public abstract createTransaction(): Observable<IMerchantAdminTransaction>;
    public abstract redeemVoucher(id: number): Observable<IVoucher>;
}
