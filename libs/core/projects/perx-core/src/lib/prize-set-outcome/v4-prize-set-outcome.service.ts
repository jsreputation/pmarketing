import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import { Observable, timer } from 'rxjs';
import { map, switchMap, last, takeUntil, takeWhile } from 'rxjs/operators';
import {
  IPrizeSetItem,
  IPrizeSetOutcome
} from './models/prize-set-outcome.model';
import { OutcomeType } from '../outcome/models/outcome.model';
import { IPrizeSetOutcomeService } from './prize-set-outcome.service';

export interface IV4PrizeSet {
  id: number;
  actual_outcome_id: number;
  actual_outcome_type: string;
  campaign_prize_id: number;
  campaign_prize_type: string;
  points_count?: number;
  state?: string;
  details?: string;
}
interface IV4GetPrizeSetResponse {
  data: IV4PrizeSet[];
}
export interface IV4PrizeSetOutcome {
  id: number;
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


  public getPrizeSet(transactionId: number): Observable<IPrizeSetItem[]> {
    return this.http.get<IV4GetPrizeSetResponse>(`${this.baseUrl}/v4/prize_set_transactions/${transactionId}/outcomes`)
      .pipe(
        map((res: IV4GetPrizeSetResponse) => res.data),
        map((outcomes: IV4PrizeSet[]) => outcomes.map(outcome => V4PrizeSetOutcomeService.v4PrizeSetItemToPrizeSetItem(outcome)))
      );
  }

  public getPrizeSetState(transactionId: number): Observable<string> {

    return timer(0, 1000).pipe(
      switchMap((_) => this.http.get<IV4PrizeSetOutcomeResponse>(`${this.baseUrl}/v4/prize_set_transactions/${transactionId}`)),
      map((res) => res.data),
      map((outcome: IV4PrizeSetOutcome) => V4PrizeSetOutcomeService.v4PrizeSetOutcomeToPrizeSetOutcome(outcome)),
      takeWhile((transaction: IPrizeSetOutcome) => transaction.state !== 'completed' && transaction.state !== 'failed', true),
      takeUntil(timer(10000)),
      last(),
      map((transaction: IPrizeSetOutcome) => transaction.state)
    );
  }

  public static v4PrizeSetItemToPrizeSetItem(prizeSet: IV4PrizeSet): IPrizeSetItem {
    return {
      id: prizeSet.id,
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
      id: prizeSetOutcome.id,
      outcomeType: prizeSetOutcome.outcome_type,
      state: prizeSetOutcome.state
    };
  }
}
