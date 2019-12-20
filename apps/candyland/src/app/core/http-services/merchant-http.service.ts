import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWMerchantAttributes, IWMerchantBranchAttributes, IJsonApiItemPayload, IJsonApiPostItem, IJsonApiPatchItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class MerchantHttpService {

  constructor(private http: HttpClient) {
  }

  public createMerchant(data: IJsonApiPostItem<IWMerchantAttributes>): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWMerchantAttributes>>(ApiConfig.merchantsPath + '/orgs', data);
  }

  public updateMerchant(
    id: string, data: IJsonApiItemPayload<IWMerchantAttributes>
  ): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWMerchantAttributes>>(ApiConfig.merchantsPath + '/orgs/' + id, data);
  }

  public deleteMerchant(id: string): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    return this.http.delete<IJsonApiItemPayload<IWMerchantAttributes>>(ApiConfig.merchantsPath + '/orgs/' + id);
  }

  public createMerchantBranch(
    data: IJsonApiPostItem<IWMerchantBranchAttributes>
  ): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWMerchantBranchAttributes>>(ApiConfig.merchantsPath + '/branches', data);
  }

  public updateMerchantBranch(id: string, data: IJsonApiPatchItem<IWMerchantBranchAttributes>):
    Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWMerchantBranchAttributes>>(ApiConfig.merchantsPath + '/branches/' + id, data);
  }

  public deleteMerchantBranch(id: string): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    return this.http.delete<IJsonApiItemPayload<IWMerchantBranchAttributes>>(ApiConfig.merchantsPath + '/branches/' + id);
  }
}
