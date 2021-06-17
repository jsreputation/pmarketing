import { Observable } from 'rxjs/internal/Observable';
import { IMilestone, IProgressTotal, IProgressTransaction } from './progress-campaign.model';

export abstract class ProgressCampaignService {

  public abstract getCampaignTotalProgress(campaignId: number): Observable<IProgressTotal>;
  public abstract getCampaignProgressTransactions(campaignId: number): Observable<IProgressTransaction[]>;
  public abstract getCampaignProgressMilestones(campaignId: number): Observable<IMilestone[]>;

}
