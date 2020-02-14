import { Observable } from 'rxjs';
import { ICampaign, CampaignType } from './models/campaign.model';

export interface ICampaignFilterOptions {
  type?: CampaignType;
  page?: number;
}

export abstract class ICampaignService {
  public abstract getCampaigns(options?: ICampaignFilterOptions): Observable<ICampaign[]>;
  public abstract getCampaign(id: number): Observable<ICampaign>;
}
