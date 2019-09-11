import { Observable } from 'rxjs';
import { ICampaign } from './models/campaign.model';

export abstract class ICampaignService {
  public abstract getCampaigns(): Observable<ICampaign[]>;
  public abstract getCampaign(id: number): Observable<ICampaign>;
}
