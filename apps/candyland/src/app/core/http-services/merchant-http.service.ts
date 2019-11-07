import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { MerchantBranch, Merchant } from '@cl-core/http-adapters/merchant';
import { IWMerchant, IWMerchantBranchApi} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class MerchantHttpService {

  constructor(private http: HttpClient) {
  }

  public createMerchant(data: IJsonApiPayload<IWMerchant>): Observable<any> {
    return this.http.post<IJsonApiPayload<Merchant>>(ApiConfig.merchantsPath + '/orgs', data);
  }

  public updateMerchant(id: string, data: IJsonApiPayload<IWMerchant>): Observable<any> {
    return this.http.patch<IJsonApiPayload<Merchant>>(ApiConfig.merchantsPath + '/orgs/' + id, data);
  }

  public deleteMerchant(id: string): Observable<IResponseApi<Response>> {
    return this.http.delete<IResponseApi<Response>>(ApiConfig.merchantsPath + '/orgs/' + id);
  }

  public createMerchantBranch(data: IJsonApiPayload<IWMerchantBranchApi>): Observable<IJsonApiPayload<MerchantBranch>> {
    return this.http.post<IJsonApiPayload<MerchantBranch>>(ApiConfig.merchantsPath + '/branches', data);
  }

  public updateMerchantBranch(id: string, data: IJsonApiPayload<IWMerchantBranchApi>): Observable<IJsonApiPayload<MerchantBranch>> {
    return this.http.patch<IJsonApiPayload<MerchantBranch>>(ApiConfig.merchantsPath + '/branches/' + id, data);
  }

  public deleteMerchantBranch(id: string): Observable<IResponseApi<Response>> {
    return this.http.delete<IResponseApi<Response>>(ApiConfig.merchantsPath + '/branches/' + id);
  }
}
