import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedemptionService {

  constructor(
    private http: HttpClient,
    @Inject('config') private config: any
  ) {
  }

  redeemVoucher(id: string): Observable<any> {
    const url = `${this.config.env.apiHost}/v4/vouchers/${id}/redeem`;

    return this.http.post(url, null, {}).pipe(
      map(resp => resp[`data`])
    );
  }
}
