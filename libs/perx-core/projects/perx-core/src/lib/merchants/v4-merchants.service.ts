import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'perx-core/perx-core';
import { Observable, of } from 'rxjs';
import { mergeMap, mergeAll, map } from 'rxjs/operators';
import { IMerchantsService } from './imerchants.service';
import { IMerchant, IMeta } from './models/merchants.model';

interface IV4GetMerchantsResponse {
  data: IMerchant[];
  meta?: IMeta;
}

interface IV4GetMerchantResponse {
  data: IMerchant;
}

@Injectable({
  providedIn: 'root'
})
export class V4MerchantsService implements IMerchantsService {
  private historyMeta: IMeta = {};

  constructor(
    private http: HttpClient,
    private config: Config
  ) {
  }

  public getAllMerchants(): Observable<IMerchant[]> {
    const pageSize = 100;
    return this.getMerchants(1, pageSize).pipe(
      mergeMap((merchants: IMerchant[]) => {
        const streams = [
          of(merchants)
        ];

        for (let i = 2; i <= this.historyMeta.total_pages; i++) {
          const stream = this.getMerchants(i, pageSize);
          streams.push(stream);
        }

        return streams;
      }),
      mergeAll(5),
    );
  }

  private getMerchants(page: number = 1, pageSize: number = 25): Observable<IMerchant[]> {
    return this.http.get<IV4GetMerchantsResponse>(
      `${this.config.apiHost}/v4/merchants`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IV4GetMerchantsResponse) => {
        if (res.meta) {
          this.historyMeta = {
            ...this.historyMeta,
            ...res.meta
          };
        }

        return res.data;
      })
    );
  }

  public getMerchant(merchantId: number): Observable<IMerchant> {
    return this.http.get<IV4GetMerchantResponse>(
      `${this.config.apiHost}/v4/merchants/${merchantId}`
    ).pipe(
      map(res => res.data)
    );
  }

}
