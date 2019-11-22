
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { Injectable } from '@angular/core';
import { IWVoucherStatsApi, IWVouchersApi } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class VouchersHttpService {
  constructor(private http: HttpClient) { }

  public getVouchers(params: HttpParams): Observable<IJsonApiListPayload<IWVouchersApi>> {
    return this.http.get<IJsonApiListPayload<IWVouchersApi>>(ApiConfig.vouchersEntitiesPath + '/', { params });
  }

  public getVoucher(id: string): Observable<IJsonApiPayload<IWVouchersApi>> {
    return this.http.get<IJsonApiPayload<IWVouchersApi>>(ApiConfig.vouchersEntitiesPath + '/' + id);
  }

  public createVoucher(data: IJsonApiPayload<IWVouchersApi>): Observable<IJsonApiPayload<IWVouchersApi>> {
    return this.http.post<IJsonApiPayload<IWVouchersApi>>(ApiConfig.voucherBatchPath, data);
  }

  public getStats(rewardId: string): Observable<IJsonApiPayload<IWVoucherStatsApi>> {
    return this.http.get<IJsonApiPayload<IWVoucherStatsApi>>(`${ApiConfig.basePath}/voucher-service/stats?source_id=${rewardId}&source_type=Perx::Reward::Entity`);
  }
}
