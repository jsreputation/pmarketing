
import { Observable } from 'rxjs';
import { IQuestCampaign } from './quest.model';

export abstract class IQuestService {
    public abstract getQuestCampaigns(): Observable<IQuestCampaign[]>;
    public abstract getQuestsFromCampaign(campaignId: number): Observable<IQuestCampaign>;
    public abstract postEnrollQuest(campaignId: number): void;
    public abstract get(questId: number): Observable<IQuestCampaign>;
}
