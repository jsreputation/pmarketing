import { Observable } from 'rxjs';
import { IQuest, IQuestTask } from './quest.model';

export abstract class IQuestService {
    public abstract getQuestProgress(questId: number): Observable<IQuest> ;
    public abstract getQuestFromCampaign(campaignId: number): Observable<IQuest[]>;
    public abstract getQuestTasks(campaignId: number): Observable<IQuestTask[]>;
}
