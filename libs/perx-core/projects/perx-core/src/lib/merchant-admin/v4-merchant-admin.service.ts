import { Injectable } from '@angular/core';
import { IMerchantAdminService } from './imerchant-admin.service';

@Injectable({
  providedIn: 'root'
})
export class V4MerchantAdminService implements IMerchantAdminService {

  public createTransaction(): void {
  }
}
