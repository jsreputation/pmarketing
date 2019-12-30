import { Observable } from 'rxjs';
import { ICampaign } from './models/campaign.model';
import { IVoucher } from '../vouchers/models/voucher.model';

export abstract class ICampaignService {
  public abstract getCampaigns(): Observable<ICampaign[]>;
  public abstract getCampaign(id: number): Observable<ICampaign>;
  public abstract issueAll(id: number): Observable<IVoucher[]>;
}
