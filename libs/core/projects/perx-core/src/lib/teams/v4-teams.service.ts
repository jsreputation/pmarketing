import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ConfigService, IConfig, TeamsService } from '@perxtech/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { ITeam, TeamState } from './teams.model';
import { of, throwError } from 'rxjs';

interface IV4Team {
  id: number;
  campaign_id: number;
  invitation_code: string;
  state: TeamState;
}

interface IV4TeamResponse {
  data: IV4Team;
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class V4TeamsService implements TeamsService{
  public apiHost: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<any>) => this.apiHost = config.apiHost as string);
  }

  createATeamforCampaign(campaignId: number): Observable<ITeam> {
    return this.http.post<IV4TeamResponse>(`${this.apiHost}/v4/teams`, { campaign_id: campaignId}).pipe(
      map(res => res.data),
      map((team: IV4Team) => V4TeamsService.v4TeamToTeam(team))
    );
  }

  getTeam(campaignId: number): Observable<ITeam> {
    return this.http.get<IV4TeamResponse>(`${this.apiHost}/v4/campaigns/${campaignId}/user_team`).pipe(
      map(res => res.data),
      map((team: IV4Team) => V4TeamsService.v4TeamToTeam(team))
    );
  }

  joinATeamForCampaign(campaignId: number, invitationCode: string): Observable<ITeam> {
    return this.http.post<IV4TeamResponse>(`${this.apiHost}/v4/team_members`,
      { campaign_id: campaignId, invitation_code: invitationCode}).pipe(
      map(res => res.data),
      map((team: IV4Team) => V4TeamsService.v4TeamToTeam(team))
    );
  }

  leaveATeam(teamId: number): Observable<boolean> {
    return this.http.delete(`${this.apiHost}/v4/team_members/me?team_id=${teamId}`).pipe(
      map((response: HttpResponse<any>) => response.status === 200),
      catchError((error: HttpErrorResponse) => error.status === 404 ? of(false) : throwError(error))
    );
  }

  public static v4TeamToTeam(team: IV4Team): ITeam {
    return {
      id: team.id,
      campaignId: team.campaign_id,
      invitationCode: team.invitation_code,
      state: team.state
    }
  }
}
