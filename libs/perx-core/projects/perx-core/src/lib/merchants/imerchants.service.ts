import { Observable } from 'rxjs';
import { IMerchant } from './models/merchants.model';

export abstract class IMerchantsService {
  public abstract getAllMerchants(): Observable<IMerchant[]>;
  public abstract getMerchant(id: number, useCache?: boolean, page?: number): Observable<IMerchant>;
  public abstract getMerchants(page: number): Observable<IMerchant[]>;
}
