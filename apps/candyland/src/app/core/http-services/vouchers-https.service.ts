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

import { ApiConfig } from '@cl-core/api-config';
import { SOURCE_TYPE } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class VouchersHttpService {
  constructor(private http: HttpClient) { }

  public getVouchers(params: HttpParams): Observable<IJsonApiListPayload<IWVouchersApi>> {
    return this.http.get<IJsonApiListPayload<IWVouchersApi>>(ApiConfig.vouchersEntitiesPath + '/', { params });
  }

  public getVoucher(id: string): Observable<IJsonApiItemPayload<IWVouchersApi>> {
    return this.http.get<IJsonApiItemPayload<IWVouchersApi>>(ApiConfig.vouchersEntitiesPath + '/' + id);
  }

  public createVoucher(data: IJsonApiPostItem<IWVouchersApi>): Observable<IJsonApiItemPayload<IWVouchersApi>> {
    return this.http.post<IJsonApiItemPayload<IWVouchersApi>>(ApiConfig.voucherBatchPath, data);
  }

  public getBatch(id: number): Observable<IJsonApiItemPayload<IWVouchersApi>> {
    return this.http.get<IJsonApiItemPayload<IWVouchersApi>>(`${ApiConfig.voucherBatchPath}/${id}`);
  }

  public getStats(rewardId: string): Observable<IJsonApiItemPayload<IWVoucherStatsApi>> {
    return this.http.get<IJsonApiItemPayload<IWVoucherStatsApi>>(
      `${ApiConfig.basePath}/voucher-service/stats?source_id=${rewardId}&source_type=${SOURCE_TYPE}`
    );
  }
}
