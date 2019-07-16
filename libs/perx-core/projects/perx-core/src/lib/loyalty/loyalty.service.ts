import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvConfig } from './env-config';
import { Observable, of } from 'rxjs';
import { map, mergeMap, concatAll, reduce } from 'rxjs/operators';

interface IV4Meta {
  count?: number;
  size?: number;
  total_pages?: number;
  page?: number;
}

interface IV4Loyalty {
  id: number;

  points_history?: IV4PointHistory[];
}

interface IV4GetLoyaltiesResponse {
  data: IV4Loyalty[];
  meta?: IV4Meta;
}

interface IV4GetLoyaltyResponse {
  data: IV4Loyalty;
  meta?: IV4Meta;
}

interface IV4PointHistory {
  id: number;
  identifier?: string;
  name?: string;
  points: number;
  points_balance: number;
  points_balance_converted_to_currency: number;
  points_date: string;
  properties: {};
}

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {
  private baseUrl: string;
  private historyMeta: IV4Meta = {};

  constructor(
    private http: HttpClient,
    config: EnvConfig
  ) {
    this.baseUrl = config.env.apiHost;
  }

  getLoyalties(page = 1, pageSize = 25): Observable<IV4Loyalty[]> {
    return this.http.get<IV4GetLoyaltiesResponse>(
      `${this.baseUrl}/v4/loyalty`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map(res => res.data)
    );
  }

  getLoyalty(id: number): Observable<IV4Loyalty> {
    return this.http.get<IV4GetLoyaltyResponse>(
      `${this.baseUrl}/v4/loyalty/${id}`
    ).pipe(
      map(res => res.data)
    );
  }

  getAllHistory(loyaltyId: number): Observable<IV4PointHistory[]> {
    const pageSize = 100;
    return this.getHistory(loyaltyId, 1, pageSize).pipe(
      mergeMap(history => {
        const streams = [
          of(history)
        ];
        for (let i = 2; i <= this.historyMeta.total_pages; i++) {
          const stream = this.getHistory(loyaltyId, i, pageSize);
          streams.push(stream);
        }
        return streams;
      }),
      concatAll(),
      reduce((acc: IV4PointHistory[], curr: IV4PointHistory[]) => acc.concat(curr), []),
    );
  }

  getHistory(loyaltyId: number, page = 1, pageSize = 25): Observable<IV4PointHistory[]> {
    return this.http.get<IV4GetLoyaltyResponse>(
      `${this.baseUrl}/v4/loyalty/${loyaltyId}/transactions`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map(res => {
        if (res.meta) {
          this.historyMeta = {
            ...this.historyMeta,
            ...res.meta
          };
        }

        return res.data;
      }),
      map(loyalty => loyalty.points_history)
    );
  }
}
