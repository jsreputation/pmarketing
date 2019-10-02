import { Injectable } from '@angular/core';
import { IMerchantAdminService } from './imerchant-admin.service';
import { Observable } from 'rxjs';
import { IMerchantAdminTransaction } from './models/merchants-admin.model';

@Injectable({
  providedIn: 'root'
})
export class WhistlerMerchantAdminService implements IMerchantAdminService {

  public createTransaction(): Observable<IMerchantAdminTransaction> {
    throw new Error(`createTransaction Method not implemented.`);
  }

}
