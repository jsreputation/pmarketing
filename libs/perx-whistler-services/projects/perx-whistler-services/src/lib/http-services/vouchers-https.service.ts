import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  IWVoucherStatsApi,
  IWVouchersApi,
  IJsonApiListPayload,
  IJsonApiItemPayload,
  IJsonApiPostItem,
} from '@perx/whistler';
import { SOURCE_TYPE } from '../app.constants';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class VouchersHttpService {
  constructor(private http: HttpClient,
              private apiConfig: ApiConfigServices
              ) { }
  public getVouchers(params: HttpParams): Observable<IJsonApiListPayload<IWVouchersApi>> {
    return this.http.get<IJsonApiListPayload<IWVouchersApi>>(this.apiConfig.vouchersEntitiesPath + '/', { params });
  }

  public getVoucher(id: string): Observable<IJsonApiItemPayload<IWVouchersApi>> {
    return this.http.get<IJsonApiItemPayload<IWVouchersApi>>(this.apiConfig.vouchersEntitiesPath + '/' + id);
  }

  public createVoucher(data: IJsonApiPostItem<IWVouchersApi>): Observable<IJsonApiItemPayload<IWVouchersApi>> {
    return this.http.post<IJsonApiItemPayload<IWVouchersApi>>(this.apiConfig.voucherBatchPath, data);
  }

  public getBatch(id: number): Observable<IJsonApiItemPayload<IWVouchersApi>> {
    return this.http.get<IJsonApiItemPayload<IWVouchersApi>>(`${this.apiConfig.voucherBatchPath}/${id}`);
  }

  public getStats(rewardId: string): Observable<IJsonApiItemPayload<IWVoucherStatsApi>> {
    return this.http.get<IJsonApiItemPayload<IWVoucherStatsApi>>(
      `${this.apiConfig.baseApiPath}/voucher-service/stats?source_id=${rewardId}&source_type=${SOURCE_TYPE}`
    );
  }
}
