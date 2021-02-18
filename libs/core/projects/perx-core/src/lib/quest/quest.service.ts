
import { Observable } from 'rxjs';
import { IQuest } from './quest.model';
import { ICampaign } from '../campaign/models/campaign.model';

export abstract class IQuestService {
    public abstract getQuestCampaigns(): Observable<ICampaign[]>;
    public abstract getQuestCampaign(campainId: number): Observable<ICampaign>;
    public abstract getQuestFromCampaign(campaign: ICampaign): Observable<IQuest>;
    public abstract postEnrollQuest(campaignId: number): Observable<any>;
}
