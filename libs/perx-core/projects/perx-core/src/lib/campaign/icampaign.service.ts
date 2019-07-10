import { Observable } from 'rxjs';
import { ICampaign } from './models/campaign.model';

export interface ICampaignService {
  getCampaigns(): Observable<ICampaign[]>;
}
