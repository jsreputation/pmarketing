import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http: HttpClient) { }
  public getMerchants(): Observable<IMerchant[]> {
    return this.http.get<IMerchant[]>('assets/activities/merchant/merchants.json');
  }

  public getMerchantList(): Observable<IMerchant[]> {
    return this.http.get<IMerchant[]>('assets/activities/merchant/list-merchant.json');
  }
}
