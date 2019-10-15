import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { VouchersHttpService } from '@cl-core/http-services/vouchers-https.service';
import { VouchersHttpAdapter } from '@cl-core/http-adapters/vouchers-http-adapter';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor(private vouchersHttp: VouchersHttpService, private http: HttpClient) { }

  public getVouchers(params: HttpParams): Observable<any> {
    return this.vouchersHttp.getVouchers(params);
  }

  public getVoucher(id: string): Observable<IRewardEntityForm> {
    return this.vouchersHttp
      .getVoucher(id)
      .pipe(
        tap(response => console.log(response))
      );
  }

  public createVoucher(data: any): Observable<any> {
    const formattedVoucher = VouchersHttpAdapter.transformCreateVoucher(data);
    return this.vouchersHttp.createVoucher({ data: formattedVoucher });
  }

  private transformToVoucherStatsObj(httpResp: IJsonApiPayload<IVoucherStatsApi>): IVoucherStatsResults {
    const result: IVoucherStatsResults = { available: 0, issued: 0, expired: 0, redeemed: 0};
    const {inventory, assigned} = httpResp.data.attributes;
    for (const property in inventory) {
      if (property !== 'issued') { // dont need to loop through it again //dw loop unnecessarily
        result[property] += +inventory[property];
      }
    }
    for (const property in assigned) {
      if (property !== 'voided') {
        result[property] += +assigned[property];
      }
    }
    return result;
  }

  public getStats(rewardId: string): Observable<IVoucherStatsResults> {
    return this.http.get(`${ApiConfig.basePath}/voucher/stats?source_id=${rewardId}&source_type=Perx::Reward::Entity`).pipe(
      map((res) => this.transformToVoucherStatsObj(res as IJsonApiPayload<IVoucherStatsApi>))
    );
  }
}
