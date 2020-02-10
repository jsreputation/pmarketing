import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPMerchants, IPPutMerchant } from '@perx/model/dist/perx-model/lib/merchants/merchants';
import { IPPostMerchant, IPPostMerchantResponse } from '@perx/model';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';

export interface IGetMerchantsQuery {
  search_string?: string;
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MerchantsService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getMerchants(query?: IGetMerchantsQuery): Observable<IPMerchants> {
    const params: { [k: string]: string } = {};
    if (query) {
      Object.entries(query).forEach(([k, value]: [string, string]) => { params[k] = value; });
    }
    return this.http.get<IPMerchants>(`${this.apiConfig.baseApiPath}/v4/dash/merchants`, { params });
  }

  public postMerchant(req: IPPostMerchant): Observable<IPPostMerchantResponse> {
    return this.http.post<IPPostMerchantResponse>(`${this.apiConfig.baseApiPath}/v4/dash/merchants`, req);
  }

  public putMerchant(req: IPPutMerchant): Observable<IPPostMerchantResponse> {
    return this.http.post<IPPostMerchantResponse>(`${this.apiConfig.baseApiPath}/v4/dash/merchants/${req.id}`, req);
  }
}
