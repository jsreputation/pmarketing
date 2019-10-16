import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VouchersHttpService } from '@cl-core/http-services/vouchers-https.service';
import { VouchersHttpAdapter } from '@cl-core/http-adapters/vouchers-http-adapter';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor(private vouchersHttp: VouchersHttpService) { }

  public getVouchers(params: HttpParams): Observable<any> {
    return this.vouchersHttp.getVouchers(params);
  }

  public getVoucher(id: string): Observable<IRewardEntityForm> {
    return this.vouchersHttp
      .getVoucher(id);
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
}
