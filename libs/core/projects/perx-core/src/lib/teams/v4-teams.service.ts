import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService, TeamsService } from '@perxtech/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class V4TeamsService implements TeamsService{

  constructor(http: HttpClient, configService: ConfigService) { }

  createATeamforCampaign(campaignId: number): Observable<any> {
    return undefined;
  }

  getTeam(campaignId: number): Observable<any> {
    return undefined;
  }

  joinATeamForCampaign(campaignId: number, invitationCode: string): Observable<any> {
    return undefined;
  }

  leaveATeam(campaignId: number): Observable<any> {
    return undefined;
  }
}
