import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService, IConfig } from '@perxtech/core';
import { Observable } from 'rxjs';
import { ICampaignInviteService } from './icampaign-invite.service';
import { IGlobalTopScoreResponse, IInvite, IInviteResponse } from './models/campaign-referral.model';

@Injectable({ providedIn: 'root' })
export class CampaignInviteService implements ICampaignInviteService {
    private apiHost: string;
    constructor(private http: HttpClient, private configService: ConfigService) {
        this.configService.readAppConfig().subscribe(
            (config: IConfig<void>) => {
                this.apiHost = config.apiHost as string;
            });
    }

    public getAllInvites(): Observable<IInviteResponse> {
        return this.http.get<IInviteResponse>(
            `${this.apiHost}/v4/campaign_invitations/`
        );
    }

    public getInvitesById(id: number): Observable<IInviteResponse> {
        if (id) {
            return this.http.get<IInviteResponse>(
                `${this.apiHost}/v4/campaign_invitations?campaign_id=${id}`
            );
        }
        return this.getAllInvites();
    }

    public sendInvite(invite: IInvite): Observable<IInviteResponse> {
        return this.http.post<IInviteResponse>(`${this.apiHost}/v4/campaign_invitations/`, invite);
    }

    public getGlobalTopScore(): Observable<IGlobalTopScoreResponse> {
        return this.http.get<IGlobalTopScoreResponse>(`${this.apiHost}/v4/dbshk/top_score`);
    }
}
