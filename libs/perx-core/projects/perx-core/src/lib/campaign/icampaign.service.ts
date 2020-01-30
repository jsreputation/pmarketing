import { Observable } from 'rxjs';
import { ICampaign, CampaignType } from './models/campaign.model';
import { IVoucher } from '../vouchers/models/voucher.model';

export interface ICampaignFilterOptions {
  type?: CampaignType;
}

export abstract class ICampaignService {
  public abstract getCampaigns(options?: ICampaignFilterOptions): Observable<ICampaign[]>;
  public abstract getCampaign(id: number): Observable<ICampaign>;
  public abstract issueAll(id: number): Observable<IVoucher[]>;
}
