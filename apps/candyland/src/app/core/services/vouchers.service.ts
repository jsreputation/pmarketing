import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VouchersHttpService } from '@cl-core/http-services/vouchers-https.service';
import { VouchersHttpAdapter } from '@cl-core/http-adapters/vouchers-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor(private vouchersHttp: VouchersHttpService) { }

  public getVouchers(params: HttpParams): Observable<any> {
    return this.vouchersHttp.getVouchers(params);
  }

  public getVoucher(id: string): Observable<IRewardEntityForm> {
    return this.vouchersHttp.getVoucher(id).pipe(
      map(response => {
        console.log(response);
      })
    );
  }

  public createVoucher(data: any): Observable<any> {
    const formattedVoucher = VouchersHttpAdapter.transformCreateVoucher(data);
    return this.vouchersHttp.createVoucher({ data: formattedVoucher });
  }

  // This will be replaced with the new endpoint
  // @ts-ignore
  public getStats(rewardId: string): Observable<{ [k: string]: number }> {
    return of({
      available: Math.floor(Math.random() * 10000),
      issued: Math.floor(Math.random() * 10000),
      expired: Math.floor(Math.random() * 10000),
      redeemed: Math.floor(Math.random() * 10000)
    });
  }
}
