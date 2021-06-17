import { Observable } from 'rxjs/internal/Observable';

export abstract class ProgressCampaignService {

  public abstract getCampaignTotalProgress(campaignId: number): Observable<any>;
  public abstract getCampaignProgressTransactions(campaignId: number): Observable<any>;
  public abstract getCampaignProgressMilestones(campaignId: number): Observable<any>;

}
