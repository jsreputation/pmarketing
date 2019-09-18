import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VouchersHttpService } from '@cl-core/http-services/vouchers-https.service';

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
    const sendData = data;
    return this.vouchersHttp.createVoucher({data: sendData});
  }
}
