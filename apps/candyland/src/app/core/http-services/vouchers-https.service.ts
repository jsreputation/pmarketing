
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { Injectable } from '@angular/core';
import { IVoucherStatsApi, IVouchersApi } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class VouchersHttpService {
  constructor(private http: HttpClient) { }

  public getVouchers(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.vouchersEntitiesPath + '/', { params });
  }

  public getVoucher(id: string): Observable<any> {
    return this.http.get<any>(ApiConfig.vouchersEntitiesPath + '/' + id);
  }

  public createVoucher(data: IJsonApiPayload<IVouchersApi>): Observable<any> {
    return this.http.post<any>(ApiConfig.voucherBatchPath, data);
  }

  public getStats(rewardId: string): Observable<IJsonApiPayload<IVoucherStatsApi>> {
    return this.http.get<IJsonApiPayload<IVoucherStatsApi>>(`${ApiConfig.basePath}/voucher-service/stats?source_id=${rewardId}&source_type=Perx::Reward::Entity`);
  }
}
