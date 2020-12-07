import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '@perxtech/core';
import { Observable } from 'rxjs';
import { ICampaignInviteService } from './icampaign-invite.service';
import { IInvite, IInviteResponse } from './models/campaign-referral.model';

@Injectable({ providedIn: 'root' })
export class CampaignInviteService implements ICampaignInviteService {

    constructor(private http: HttpClient, private config: Config) { }

    public getAllInvites(): Observable<IInviteResponse> {
        return this.http.get<IInviteResponse>(
            `${this.config.apiHost}/v4/campaign_invitations/`
        );
    }

    public sendInvite(invite: IInvite): Observable<IInviteResponse> {
        return this.http.post<IInviteResponse>(`${this.config.apiHost}/v4/campaign_invitations/`, invite);
    }
}
