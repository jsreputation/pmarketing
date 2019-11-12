import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWMerchantAttributes, IWMerchantBranchAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class MerchantHttpService {

  constructor(private http: HttpClient) {
  }

  public createMerchant(data: IJsonApiPayload<IWMerchantAttributes>): Observable<IJsonApiPayload<IWMerchantAttributes>> {
    return this.http.post<IJsonApiPayload<IWMerchantAttributes>>(ApiConfig.merchantsPath + '/orgs', data);
  }

  public updateMerchant(id: string, data: IJsonApiPayload<IWMerchantAttributes>): Observable<IJsonApiPayload<IWMerchantAttributes>> {
    return this.http.patch<IJsonApiPayload<IWMerchantAttributes>>(ApiConfig.merchantsPath + '/orgs/' + id, data);
  }

  public deleteMerchant(id: string): Observable<IJsonApiPayload<IWMerchantAttributes>> {
    return this.http.delete<IJsonApiPayload<IWMerchantAttributes>>(ApiConfig.merchantsPath + '/orgs/' + id);
  }

  public createMerchantBranch(data: IJsonApiPayload<IWMerchantBranchAttributes>): Observable<IJsonApiPayload<IWMerchantBranchAttributes>> {
    return this.http.post<IJsonApiPayload<IWMerchantBranchAttributes>>(ApiConfig.merchantsPath + '/branches', data);
  }

  public updateMerchantBranch(id: string, data: IJsonApiPayload<IWMerchantBranchAttributes>):
    Observable<IJsonApiPayload<IWMerchantBranchAttributes>> {
    return this.http.patch<IJsonApiPayload<IWMerchantBranchAttributes>>(ApiConfig.merchantsPath + '/branches/' + id, data);
  }

  public deleteMerchantBranch(id: string): Observable<IJsonApiPayload<IWMerchantBranchAttributes>> {
    return this.http.delete<IJsonApiPayload<IWMerchantBranchAttributes>>(ApiConfig.merchantsPath + '/branches/' + id);
  }
}
