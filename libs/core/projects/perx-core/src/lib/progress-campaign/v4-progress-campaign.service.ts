import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { ProgressCampaignService } from './progress-campaign.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { IMilestone, IProgressTotal, IProgressTransaction } from './progress-campaign.model';
import { IV4CampaignOutcome, V4CampaignService } from '../campaign/v4-campaign.service';

@Injectable({
  providedIn: 'root'
})
export class V4ProgressCampaignService implements ProgressCampaignService {
  private hostName: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.hostName = config.apiHost as string;
      });
  }

  public getCampaignProgressMilestones(campaignId: number): Observable<IMilestone[]> {
    return this.http.get<IV4ProgressMilestoneResponse>(`${this.hostName}/v4/milestones?campaign_id=${campaignId}`)
      .pipe(
        map((res => res.data)),
        map((milestones: IV4ProgressMilestone[]) => milestones.map(
          (milestone: IV4ProgressMilestone) => V4ProgressCampaignService.v4MilestoneToMilestone(milestone))
        )
      );
  }

  public getCampaignProgressTransactions(campaignId: number): Observable<IProgressTransaction[]> {
    return this.http.get<IV4ProgressTransactionsResponse>(
      `${this.hostName}/v4/progress_points_transactions?campaign_id=${campaignId}`
    ).pipe(
      map(res => res.data),
      map((progressTransactions: IV4ProgressTransaction[]) =>
        progressTransactions.map((progressTransaction: IV4ProgressTransaction) =>
          V4ProgressCampaignService.v4progressTransactionsToprogressTransactions(progressTransaction))
      )
    );
  }

  public getCampaignTotalProgress(campaignId: number): Observable<IProgressTotal> {
    return this.http.get<IV4ProgressTotalResponse>(
      `${this.hostName}/v4/progress_points_transactions/total_points?campaign_id=${campaignId}`
    ).pipe(
      map(res => res.data),
      map((total: IV4ProgressTotal) => {
        return {
          userTotalAccumulatedCampaignPoints: total.user_total_campaign_points
        };
      })
    );
  }

  private static v4MilestoneToMilestone(milestone: IV4ProgressMilestone): IMilestone {
    return {
      id: milestone.id,
      displayProperties: milestone.display_properties, // to be mapped in future when used
      outcomesIssued: milestone.milestone_outcome_issued_to_user,
      name: milestone.name,
      outcomes: milestone.outcomes.map((milestoneOutcome: IV4CampaignOutcome) =>
        V4CampaignService.v4CampaignOutcomeToCampaignOutcome(milestoneOutcome)
      ),
      pointsRequired: milestone.points
    };
  }

  private static v4progressTransactionsToprogressTransactions(progresstransaction: IV4ProgressTransaction): IProgressTransaction {
    return {
      id: progresstransaction.id,
      amount: progresstransaction.amount,
      campaignId: progresstransaction.campaign_id,
      userAccountid: progresstransaction.user_account_id
    }
  }
}

export interface IV4ProgressMilestoneResponse {
  data: IV4ProgressMilestone[];
  meta: {
    count: number;
  };
};

export interface IV4ProgressMilestone {
  id: number;
  display_properties: null;
  milestone_outcome_issued_to_user: boolean;
  name: string;
  outcomes: IV4CampaignOutcome[];
  points: number;
};


export interface IV4ProgressTotalResponse {
  data: IV4ProgressTotal
};

export interface IV4ProgressTotal {
  user_total_campaign_points: number;
}

export interface IV4ProgressTransactionsResponse {
  data: IV4ProgressTransaction[];
  meta: {
    count: number;
  };
};

export interface IV4ProgressTransaction {
  id: number;
  amount: number;
  campaign_id: number;
  user_account_id: number;
};
