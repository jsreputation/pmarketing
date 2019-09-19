import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
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

  public getMerchantList(): Observable<any> {
    return this.http.get('assets/actives/merchant/list-merchant.json');
  }

  public createMerchant(data: IResponseApi<any>): Observable<IResponseApi<any>> {
    return this.http.post<IResponseApi<any>>(ApiConfig.merchantsPath + '/orgs', data);
  }

  public createMerchantBranch(data: IResponseApi<any>): Observable<IResponseApi<any>> {
    return this.http.post<IResponseApi<any>>(ApiConfig.merchantsPath + '/branches', data);
  }

  public updateMerchant(id: string, data: IResponseApi<any>): Observable<IResponseApi<any>> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.merchantsPath + '/orgs' + id, data);
  }
}
