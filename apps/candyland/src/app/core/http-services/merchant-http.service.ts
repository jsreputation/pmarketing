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

  public createMerchant(data: IJsonApiItem<any>): Observable<any> {
    return this.http.post<IResponseApi<any>>(ApiConfig.merchantsPath + '/orgs', data);
  }

  public updateMerchant(id: string, data: IJsonApiItem<any>): Observable<any> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.merchantsPath + '/orgs/' + id, data);
  }

  public deleteMerchant(id: string): Observable<IResponseApi<any>> {
    return this.http.delete<IResponseApi<any>>(ApiConfig.merchantsPath + '/orgs/' + id);
  }

  public createMerchantBranch(data: IJsonApiItem<any>): Observable<IResponseApi<any>> {
    return this.http.post<IResponseApi<any>>(ApiConfig.merchantsPath + '/branches', data);
  }

  public updateMerchantBranch(id: string, data: IJsonApiItem<any>): Observable<IResponseApi<any>> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.merchantsPath + '/branches/' + id, data);
  }

  public deleteMerchantBranch(id: string): Observable<IResponseApi<any>> {
    return this.http.delete<IResponseApi<any>>(ApiConfig.merchantsPath + '/branches/' + id);
  }
}
