import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IWMerchantAttributes, IWMerchantBranchAttributes, IJsonApiItemPayload, IJsonApiPostItem, IJsonApiPatchItem } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class MerchantHttpService {

  constructor(private http: HttpClient,
              private apiConfig: ApiConfigServices) {
  }

  public createMerchant(data: IJsonApiPostItem<IWMerchantAttributes>): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWMerchantAttributes>>(this.apiConfig.merchantsPath + '/orgs', data);
  }

  public updateMerchant(
    id: string, data: IJsonApiItemPayload<IWMerchantAttributes>
  ): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWMerchantAttributes>>(this.apiConfig.merchantsPath + '/orgs/' + id, data);
  }

  public deleteMerchant(id: string): Observable<void> {
    return this.http.delete<void>(this.apiConfig.merchantsPath + '/orgs/' + id);
  }

  public createMerchantBranch(
    data: IJsonApiPostItem<IWMerchantBranchAttributes>
  ): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWMerchantBranchAttributes>>(this.apiConfig.merchantsPath + '/branches', data);
  }

  public updateMerchantBranch(id: string, data: IJsonApiPatchItem<IWMerchantBranchAttributes>):
    Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWMerchantBranchAttributes>>(this.apiConfig.merchantsPath + '/branches/' + id, data);
  }

  public deleteMerchantBranch(id: string): Observable<void> {
    return this.http.delete<void>(this.apiConfig.merchantsPath + '/branches/' + id);
  }
}
