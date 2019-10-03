import { Observable } from 'rxjs';
import { IMerchantAdminTransaction } from './models/merchants-admin.model';

export abstract class IMerchantAdminService {
    public abstract createTransaction(): Observable<IMerchantAdminTransaction>;
}
