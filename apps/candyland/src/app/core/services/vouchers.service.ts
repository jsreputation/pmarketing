import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VouchersHttpService } from '@cl-core/http-services/vouchers-https.service';
import { VouchersHttpAdapter } from '@cl-core/http-adapters/vouchers-http-adapter';
import { map } from 'rxjs/operators';
import { IWVouchersApi, IWVoucherCodesApi } from '@perx/whistler';
import { ClHttpParams } from '@cl-helpers/http-params';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor(private vouchersHttp: VouchersHttpService) { }

  public getVouchers(params: HttpParams): Observable<any> {
    return this.vouchersHttp.getVouchers(params);
  }

  public getVoucher(id: string): Observable<IJsonApiPayload<IWVouchersApi>> {
    return this.vouchersHttp.getVoucher(id);
  }

  public createVoucher(data: any): Observable<any> {
    const formattedVoucher = VouchersHttpAdapter.transformCreateVoucher(data);
    return this.vouchersHttp.createVoucher({ data: formattedVoucher });
  }

  public getStats(rewardId: string): Observable<{ [k: string]: number }> {
    return this.vouchersHttp.getStats(rewardId)
      .pipe(
        map(VouchersHttpAdapter.transformToVoucherStatsObj)
      );
  }

  public getAvailableCodesCount(rewardId: string): Observable<number> {
    const params = {'filter[source_id]': rewardId, 'filter[source_type]': 'Perx::Reward::Entity', 'filter[status]': 'available'};
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.vouchersHttp.getAvailableCodesCount(httpParams)
      .pipe(
        map((res: IJsonApiListPayload<IWVoucherCodesApi>) => res.meta.record_count)
      );
  }
}
