import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantHttpService {

  constructor(private http: HttpClient) {
  }

  public getMerchants(): Observable<any> {
    return this.http.get('assets/actives/merchant/merchants.json');
  }
}
