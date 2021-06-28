import { Observable } from 'rxjs/internal/Observable';
import { ITeam } from './teams.model';

export abstract class TeamsService {

  public abstract createATeamforCampaign(campaignId: number): Observable<ITeam>;
  public abstract joinATeamForCampaign(campaignId: number, invitationCode: string): Observable<ITeam>;
  public abstract getTeam(campaignId: number): Observable<ITeam>;
  public abstract leaveATeam(teamId: number): Observable<boolean>;

}
