import { Observable } from 'rxjs';
import { IGlobalTopScoreResponse, IInvite, IInviteResponse } from './models/campaign-referral.model';

export abstract class ICampaignInviteService {
    public abstract sendInvite(invite: IInvite): Observable<IInviteResponse>;
    public abstract getAllInvites(): Observable<IInviteResponse>;
    public abstract getInvitesById(id: number): Observable<IInviteResponse>;
    public abstract getGlobalTopScore(): Observable<IGlobalTopScoreResponse>;
}
