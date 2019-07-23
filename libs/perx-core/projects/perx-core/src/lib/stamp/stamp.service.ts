import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {
  map,
  flatMap,
  mergeAll,
  scan,
  tap
} from 'rxjs/operators';

import { EnvConfig } from '../shared/env-config';
import {
  IStampCard,
  IGetStampCardResponse,
  IGetStampCardsResponse,
  IStamp,
  IGetStampTransactionsResponse,
  IPutStampTransactionResponse,
  IStampAllTransactionResponse,
} from './models/stamp.model';

import { VouchersService } from '../vouchers/vouchers.service';
import { IStampService } from './istamp.service';

@Injectable({
  providedIn: 'root'
})
export class StampService implements IStampService {
  public baseUrl: string;

  constructor(
    private http: HttpClient,
    config: EnvConfig,
    private vouchersService: VouchersService
  ) {
    this.baseUrl = config.env.apiHost as string;
  }

  public getCards(campaignId: number): Observable<IStampCard[]> {
    return this.http.get<IGetStampCardsResponse>(
      `${this.baseUrl}/v4/campaigns/${campaignId}/stamp_cards`, {
        params: {
          size: '100'
        }
      }
    ).pipe(
      map(res => res.data)
    );
  }

  public getCurrentCard(campaignId: number): Observable<IStampCard> {
    return this.http.get<IGetStampCardResponse>(
      `${this.baseUrl}/v4/campaigns/${campaignId}/stamp_cards/current`
    ).pipe(
      map(res => res.data)
    );
  }

  public getStamps(campaignId: number): Observable<IStamp[]> {
    return this.http.get<IGetStampTransactionsResponse>(
      `${this.baseUrl}/v4/campaigns/${campaignId}/stamp_transactions`, {
        params: {
          size: '100'
        }
      }
    ).pipe(
      flatMap((resp: IGetStampTransactionsResponse) => {
        const streams = [
          of(resp.data)
        ];
        for (let i = 2; i <= resp.meta.total_pages; i++) {
          const stream: Observable<IStamp[]> = this.getAllFromPage(campaignId, i);
          streams.push(stream);
        }
        return streams;
      }),
      mergeAll(),
      scan((acc: IStamp[], curr: IStamp[]) => acc.concat(curr), []),
      map((stamps: IStamp[]) => stamps.sort((v1, v2) => v1.id - v2.id))
    );
  }

  private getAllFromPage(campaignId: number, page: number): Observable<IStamp[]> {
    return this.http.get<IGetStampTransactionsResponse>(
      `${this.baseUrl}/v4/campaigns/${campaignId}/stamp_transactions`,
      {
        params: {
          page: `${page}`,
          size: '100'
        }
      })
      .pipe(
        map(res => res.data)
      );
  }

  public putStamp(stampId: number): Observable<IStamp> {
    return this.http.put<IPutStampTransactionResponse>(
      `${this.baseUrl}/v4/stamp_transactions/${stampId}`,
      null
    ).pipe(
      tap((res: IPutStampTransactionResponse) => {
        if (res.data.vouchers && res.data.vouchers.length > 0) {
          this.vouchersService.reset();
        }
      }),
      map(res => res.data)
    );
  }

  public stampAll(cardId: number): Observable<IStamp[]> {
    return this.http.post<IStampAllTransactionResponse>(
      `${this.baseUrl}/v4/stamp_cards/${cardId}/redeem`,
      null
    ).pipe(
      map(res => res.data.stamps),
      tap((res) => {
        res.map(r => {
          if (r.vouchers && r.vouchers.length > 0) {
            this.vouchersService.reset();
          }
        });
      }),
      map(res => res)
    );
  }
}
