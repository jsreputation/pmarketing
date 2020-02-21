import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IMerchant {
  id: string;
  logo: string;
  phone?: string;
  firstName: string;
  lastName: string;
  branches: any;
  dateCreated?: string;
}

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
