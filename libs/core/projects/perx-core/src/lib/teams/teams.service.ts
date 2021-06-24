import { Observable } from 'rxjs/internal/Observable';

export abstract class TeamsService {

  public abstract createATeamforCampaign(campaignId: number): Observable<any>;
  public abstract joinATeamForCampaign(campaignId: number, invitationCode: string): Observable<any>;
  public abstract leaveATeam(campaignId: number): Observable<any>;
  public abstract getTeam(campaignId: number): Observable<any>;

}
