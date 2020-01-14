import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import {
  IWMerchantAttributes,
  IWMerchantBranchAttributes,
  IJsonApiItemPayload,
  IJsonApiPostItem,
  IJsonApiPatchItem, IJsonApiListPayload
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class MerchantHttpService {

  constructor(private http: HttpClient) {
  }

  public getMerchant(params: HttpParams, id: string): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWMerchantAttributes>>(`${ApiConfig.merchantsPath}/orgs/${id}`, { params });
  }
  public getMerchants(params: HttpParamsOptions): Observable<IJsonApiListPayload<IWMerchantAttributes>> {
    return this.http.get<IJsonApiListPayload<IWMerchantAttributes>>(ApiConfig.merchantsPath + '/orgs/', { params });
  }

  public createMerchant(data: IJsonApiPostItem<IWMerchantAttributes>): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWMerchantAttributes>>(ApiConfig.merchantsPath + '/orgs', data);
  }

  public updateMerchant(
    id: string, data: IJsonApiItemPayload<IWMerchantAttributes>
  ): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWMerchantAttributes>>(ApiConfig.merchantsPath + '/orgs/' + id, data);
  }

  public deleteMerchant(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.merchantsPath + '/orgs/' + id);
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

  public deleteMerchantBranch(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.merchantsPath + '/branches/' + id);
  }
}
