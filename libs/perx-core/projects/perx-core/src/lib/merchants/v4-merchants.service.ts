import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, mergeAll, map, tap } from 'rxjs/operators';
import { IMerchantsService } from './imerchants.service';
import { IMerchant, IMeta } from './models/merchants.model';
import { Config } from '../config/config';

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
  private merchants: { [id: number]: { [page: number]: IMerchant } } = {};

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

  public getMerchants(page: number = 1, pageSize: number = 10): Observable<IMerchant[]> {
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

  public getMerchant(merchantId: number, useCache?: boolean, page?: number): Observable<IMerchant> {
    if (useCache === undefined) {
      useCache = true;
    }
    if (page === undefined) {
      page = 1;
    }

    if (useCache && this.merchants[merchantId] && this.merchants[merchantId][page]) {
      return of(this.merchants[merchantId][page]);
    }

    return this.http.get<IV4GetMerchantResponse>(
      `${this.config.apiHost}/v4/merchants/${merchantId}?page=${page}`
    ).pipe(
      map(res => res.data),
      tap((merchant: IMerchant) => {
        if (!this.merchants[merchantId]) {
          this.merchants[merchantId] = {};
        }
        this.merchants[merchant.id][page] = merchant;
      })
    );
  }
}
