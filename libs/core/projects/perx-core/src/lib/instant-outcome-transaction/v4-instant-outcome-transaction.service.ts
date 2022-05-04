import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import { Observable, of, timer } from 'rxjs';
import {
  catchError,
  last,
  map,
  switchMap,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';
import { IInstantOutcomeTransactionService } from './instant-outcome-transaction.service';
import {
  IInstantOutcome,
  IInstantOutcomeTransaction,
  InstantOutcomeActualOutcomeType,
  InstantOutcomeCampaignPrizeType,
  InstantOutcomeState,
  InstantOutcomeTransactionState,
} from './models/instant-outcome-transaction.model';
import { IV4AdditionalSection } from '../campaign/v4-campaign.service';

export interface IV4InstantOutcomeTransaction {
  id: number;
  campaign_id: number;
  details: string | null;
  outcomes: IV4InstantOutcome[];
  state: InstantOutcomeTransactionState;
}
interface IV4GetInstantOutcomeTransactionsResponse {
  data: IV4InstantOutcomeTransaction[];
}
interface IV4ClaimPrizeResponse {
  data: IV4InstantOutcomeTransaction;
}

interface IV4GetInstantRewardResponse {
  data: IV4InstantOutcomeTransaction;
}

export interface IV4InstantOutcome {
  id: number;
  actual_outcome_id: number;
  actual_outcome_type: InstantOutcomeActualOutcomeType;
  campaign_prize_id: number;
  campaign_prize_type: InstantOutcomeCampaignPrizeType;
  details: string | null;
  instant_outcome_transaction_id: number;
  state: InstantOutcomeState;
}

export interface IV4InstantRewardCampaignDisplayProperties {
  claim_prize?: {
    button_text?: string;
    headline?: string;
    image?: { value: { filename: string; image_url: string } };
    sub_headline?: string;
  };
  landing_page?: {
    body_text?: string;
    description?: string;
    headline?: string;
    image?: { type?: string; value?: { filename?: string; image_url?: string } };
    sub_headline?: string;
    additional_sections?: IV4AdditionalSection[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class V4InstantOutcomeTransactionService
  implements IInstantOutcomeTransactionService {
  public baseUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService
      .readAppConfig()
      .subscribe(
        (config: IConfig<any>) => (this.baseUrl = config.apiHost as string)
      );
  }

  public getInstantOutcomeTransactions(): Observable<
    IInstantOutcomeTransaction[]
  > {
    return this.http
      .get<IV4GetInstantOutcomeTransactionsResponse>(
        `${this.baseUrl}/v4/instant_outcome_transactions`
      )
      .pipe(
        map((res: IV4GetInstantOutcomeTransactionsResponse) => res.data),
        map((outcomeTransactions: IV4InstantOutcomeTransaction[]) =>
          outcomeTransactions.map((outcomeTransaction) =>
            V4InstantOutcomeTransactionService.v4InstantOutcomeTransactionToInstantOutcomeTransaction(
              outcomeTransaction
            )
          )
        )
      );
  }
  public claimPrize(
    instantOutcomeTransactionId: number
  ): Observable<IInstantOutcomeTransaction> {
    return this.http
      .post<IV4ClaimPrizeResponse>(
        `${this.baseUrl}/v4/instant_outcome_transactions/${instantOutcomeTransactionId}/redeem`,
        null
      )
      .pipe(
        map((res: IV4ClaimPrizeResponse) => res.data),
        map((outcomeTransaction: IV4InstantOutcomeTransaction) =>
          V4InstantOutcomeTransactionService.v4InstantOutcomeTransactionToInstantOutcomeTransaction(
            outcomeTransaction
          )
        )
      );
  }

  public getInstantRewardState(transactionId: number): Observable<string> {
    return timer(0, 5000).pipe(
      switchMap((_) =>
        this.http.get<IV4GetInstantRewardResponse>(
          `${this.baseUrl}/v4/instant_outcome_transactions/${transactionId}`
        )
      ),
      map((res: IV4GetInstantRewardResponse) => res.data),
      map((outcome: IV4InstantOutcomeTransaction) =>
        V4InstantOutcomeTransactionService.v4InstantOutcomeTransactionToInstantOutcomeTransaction(
          outcome
        )
      ),
      takeWhile(
        (transaction: IInstantOutcomeTransaction) =>
          transaction.state !== InstantOutcomeTransactionState.completed && transaction.state !== InstantOutcomeTransactionState.failed
          && transaction.state !== InstantOutcomeTransactionState.redeemed,
        true
      ),
      takeUntil(timer(10500)),
      last(),
      map((transaction: IInstantOutcomeTransaction) => transaction.state),
      catchError((_) => of('failed'))
    );
  }

  public getInstantOutcomeTransaction(
    transactionId: number
  ): Observable<IInstantOutcomeTransaction> {
    return this.http
      .get<IV4GetInstantRewardResponse>(
        `${this.baseUrl}/v4/instant_outcome_transactions/${transactionId}`
      )
      .pipe(
        map((res: IV4GetInstantRewardResponse) => res.data),
        map((outcome: IV4InstantOutcomeTransaction) =>
          V4InstantOutcomeTransactionService.v4InstantOutcomeTransactionToInstantOutcomeTransaction(
            outcome
          )
        )
      );
  }
  public getInstantOutcomeTransactionOutcomes(
    transactionId: number
  ): Observable<IInstantOutcome[]> {
    return this.http
      .get<IV4GetInstantRewardResponse>(
        `${this.baseUrl}/v4/instant_outcome_transactions/${transactionId}`
      )
      .pipe(
        map((res: IV4GetInstantRewardResponse) => res.data),
        map((outcome: IV4InstantOutcomeTransaction) => {
          const instantOutcomeTransaction = V4InstantOutcomeTransactionService.v4InstantOutcomeTransactionToInstantOutcomeTransaction(
            outcome
          );
          return instantOutcomeTransaction.outcomes;
        })
      );
  }

  public static v4InstantOutcomeTransactionToInstantOutcomeTransaction(
    instantOutcomeTransaction: IV4InstantOutcomeTransaction
  ): IInstantOutcomeTransaction {
    return {
      id: instantOutcomeTransaction.id,
      campaignId: instantOutcomeTransaction.campaign_id,
      details: instantOutcomeTransaction.details,
      outcomes: instantOutcomeTransaction.outcomes.length
        ? instantOutcomeTransaction.outcomes.map((item) =>
            V4InstantOutcomeTransactionService.v4InstantOutcomeToInstantOutcome(
              item
            )
          )
        : [],
      state: instantOutcomeTransaction.state,
    };
  }

  public static v4InstantOutcomeToInstantOutcome(
    instantOutcome: IV4InstantOutcome
  ): IInstantOutcome {
    return {
      id: instantOutcome.id,
      actualOutcomeId: instantOutcome.actual_outcome_id,
      actualOutcomeType: instantOutcome.actual_outcome_type,
      campaignPrizeId: instantOutcome.campaign_prize_id,
      campaignPrizeType: instantOutcome.campaign_prize_type,
      details: instantOutcome.details,
      instantOutcomeTransactionId:
        instantOutcome.instant_outcome_transaction_id,
      state: instantOutcome.state,
    };
  }
}
