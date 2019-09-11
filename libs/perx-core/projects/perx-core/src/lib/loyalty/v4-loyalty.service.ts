import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap, concatAll, reduce } from 'rxjs/operators';
import { LoyaltyService } from './loyalty.service';
import { ILoyalty, ITransaction } from './models/loyalty.model';
import { Config } from '../config/config';

interface IV4Meta {
  count?: number;
  size?: number;
  total_pages?: number;
  page?: number;
}

interface IV4AgingPoints {
  expiring_on_date?: string;
  points_expiring?: number;
}

interface IV4Loyalty {
  id: number;
  name: string;
  description: string;
  begins_at: string;
  ends_at?: string;
  current_membership_tier_id: number;
  current_membership_tier_name: string;
  membership_number: string;
  points_balance: number;
  points_balance_converted_to_currency: number;
  points_currency: string;
  points_to_currency_rate: number;
  aging_points?: IV4AgingPoints[];

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
export class V4LoyaltyService extends LoyaltyService {
  private apiHost: string;
  private historyMeta: IV4Meta = {};

  constructor(
    private http: HttpClient,
    @Optional() config: Config
  ) {
    super();
    this.apiHost = config.apiHost as string;
  }

  public static v4LoyaltyToLoyalty(loyalty: IV4Loyalty): ILoyalty {
    return {
      id: loyalty.id,
      name: loyalty.name,
      description: loyalty.description,
      beginDate: loyalty.begins_at,
      endDate: loyalty.ends_at,
      membershipTierName: loyalty.current_membership_tier_name,
      membershipIdentifier: loyalty.membership_number,
      pointsBalance: loyalty.points_balance,
      currencyBalance: loyalty.points_balance_converted_to_currency,
      currency: loyalty.points_currency,
      expiringPoints: loyalty.aging_points && loyalty.aging_points.map(aging => ({
        expireDate: aging.expiring_on_date,
        points: aging.points_expiring
      }))
    };
  }

  public static v4PointHistoryToPointHistory(pointHistory: IV4PointHistory): ITransaction {
    return {
      id: pointHistory.id,
      name: pointHistory.name,
      points: pointHistory.points,
      pointsBalance: pointHistory.points_balance,
      currencyBalance: pointHistory.points_balance_converted_to_currency,
      earnedDate: pointHistory.points_date,
      properties: pointHistory.properties
    };
  }

  public getLoyalties(page: number = 1, pageSize: number = 25): Observable<ILoyalty[]> {
    return this.http.get<IV4GetLoyaltiesResponse>(
      `${this.apiHost}/v4/loyalty`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IV4GetLoyaltiesResponse) => res.data),
      map((loyalties: IV4Loyalty[]) => loyalties.map(
        (loyalty: IV4Loyalty) => V4LoyaltyService.v4LoyaltyToLoyalty(loyalty)
      ))
    );
  }

  public getLoyalty(id?: number): Observable<ILoyalty> {
    if (!id) {
      id = 1;
    }
    return this.http.get<IV4GetLoyaltyResponse>(
      `${this.apiHost}/v4/loyalty/${id}`
    ).pipe(
      map((res: IV4GetLoyaltyResponse) => V4LoyaltyService.v4LoyaltyToLoyalty(res.data))
    );
  }

  public getAllTransactions(loyaltyId?: number): Observable<ITransaction[]> {
    if (!loyaltyId) {
      loyaltyId = 1;
    }

    const pageSize = 100;
    return this.getTransactions(loyaltyId, 1, pageSize).pipe(
      mergeMap((histories: ITransaction[]) => {
        const streams = [
          of(histories)
        ];
        for (let i = 2; i <= this.historyMeta.total_pages; i++) {
          const stream = this.getTransactions(loyaltyId, i, pageSize);
          streams.push(stream);
        }
        return streams;
      }),
      concatAll(),
      reduce((acc: ITransaction[], curr: ITransaction[]) => acc.concat(curr), [])
    );
  }

  public getTransactions(loyaltyId: number, page: number = 1, pageSize: number = 25): Observable<ITransaction[]> {
    return this.http.get<IV4GetLoyaltyResponse>(
      `${this.apiHost}/v4/loyalty/${loyaltyId}/transactions`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IV4GetLoyaltyResponse) => {
        if (res.meta) {
          this.historyMeta = {
            ...this.historyMeta,
            ...res.meta
          };
        }

        return res.data;
      }),
      map((loyalty: IV4Loyalty) => loyalty.points_history.map(
        (history: IV4PointHistory) => V4LoyaltyService.v4PointHistoryToPointHistory(history)
      ))
    );
  }
}
