import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import { Observable, timer } from 'rxjs';
import { map, switchMap, last, takeUntil, takeWhile } from 'rxjs/operators';
import {
  IPrizeSetItem,
  IPrizeSetOutcome,
  PrizeSetIssuedType,
  PrizeSetOutcomeType,
  IPrizeSet
} from './models/prize-set-outcome.model';
import { OutcomeType } from '../outcome/models/outcome.model';
import { IPrizeSetOutcomeService } from './prize-set-outcome.service';

export interface IV4PrizeSetItem {
  campaign_prize_id: number;
  campaign_prize_type: PrizeSetOutcomeType;
  actual_outcome_id?: number;
  actual_outcome_type?: PrizeSetIssuedType;
  points_count?: number;
  state?: string;
  details?: string;
}
interface IV4GetPrizeSetItemsResponse {
  data: IV4PrizeSetItem[];
}

interface IV4GetPrizeSetDetailsResponse {
  data: IV4PrizeSet;
}

export interface IV4PrizeSet {
  id: number;
  name: string;
  items: IV4PrizeSetItem[];
}

export interface IV4PrizeSetOutcome {
  id: number;
  prize_set_id: number;
  outcome_type: OutcomeType.prizeSet;
  state: string;
}

interface IV4PrizeSetOutcomeResponse {
  data: IV4PrizeSetOutcome;
}

@Injectable({
  providedIn: 'root'
})
export class V4PrizeSetOutcomeService implements IPrizeSetOutcomeService {

  public baseUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<any>) => this.baseUrl = config.apiHost as string);
  }


  public getPrizeSetIssuedOutcomes(transactionId: number): Observable<IPrizeSetItem[]> {
    return this.http.get<IV4GetPrizeSetItemsResponse>(`${this.baseUrl}/v4/prize_set_transactions/${transactionId}/outcomes`)
      .pipe(
        map((res: IV4GetPrizeSetItemsResponse) => res.data),
        map((outcomes: IV4PrizeSetItem[]) => outcomes.map(outcome => V4PrizeSetOutcomeService.v4PrizeSetItemToPrizeSetItem(outcome)))
      );
  }

  public getPrizeSetState(transactionId: number): Observable<string> {

    return timer(0, 5000).pipe(
      switchMap((_) => this.http.get<IV4PrizeSetOutcomeResponse>(`${this.baseUrl}/v4/prize_set_transactions/${transactionId}`)),
      map((res: IV4PrizeSetOutcomeResponse) => res.data),
      map((outcome: IV4PrizeSetOutcome) => V4PrizeSetOutcomeService.v4PrizeSetOutcomeToPrizeSetOutcome(outcome)),
      takeWhile((transaction: IPrizeSetOutcome) => transaction.state !== 'completed' && transaction.state !== 'failed', true),
      takeUntil(timer(10500)),
      last(),
      map((transaction: IPrizeSetOutcome) => transaction.state)
    );
  }

  public getPrizeSetDetails(prizeSetId: number): Observable<IPrizeSet> {
    return this.http.get<IV4GetPrizeSetDetailsResponse>(`${this.baseUrl}/v4/prize_sets/${prizeSetId}`)
      .pipe(
        map((res: IV4GetPrizeSetDetailsResponse) => res.data),
        map((prizeSet: IV4PrizeSet) => V4PrizeSetOutcomeService.v4PrizeSetDetailsToPrizeSetDetails(prizeSet))
      );
  }

  public static v4PrizeSetItemToPrizeSetItem(prizeSet: IV4PrizeSetItem): IPrizeSetItem {
    return {
      actualOutcomeId: prizeSet.actual_outcome_id,
      actualOutcomeType: prizeSet.actual_outcome_type,
      campaignPrizeId: prizeSet.campaign_prize_id,
      campaignPrizeType: prizeSet.campaign_prize_type,
      pointsCount: prizeSet.points_count,
      state: prizeSet.state,
      details: prizeSet.details
    };
  }

  public static v4PrizeSetOutcomeToPrizeSetOutcome(prizeSetOutcome: IV4PrizeSetOutcome): IPrizeSetOutcome {
    return {
      transactionId: prizeSetOutcome.id,
      prizeSetId: prizeSetOutcome.prize_set_id,
      outcomeType: prizeSetOutcome.outcome_type,
      state: prizeSetOutcome.state
    };
  }

  public static v4PrizeSetDetailsToPrizeSetDetails(prizeSetDetails: IV4PrizeSet): IPrizeSet {
    return {
      id: prizeSetDetails.id,
      name: prizeSetDetails.name,
      outcomes : prizeSetDetails?.items?.map(outcome => V4PrizeSetOutcomeService.v4PrizeSetItemToPrizeSetItem(outcome))
    };
  }

}
