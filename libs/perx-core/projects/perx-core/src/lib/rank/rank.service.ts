import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICampaignService} from '../campaign/icampaign.service';
import {Config} from '../config/config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private campaignService: ICampaignService,
    config: Config,
  ) {
    this.baseUrl = config.apiHost || '';
  }
  // havent confirmed type / properties
  public getLeaderBoard(id: number) {
    return this.http.get(`${this.baseUrl}/leaderboards/${id}`)
      .pipe(
        map((res) => res.data)
      )
  }

  public getLeaderBoardRanks(id: number) {
    return this.http.get(`${this.baseUrl}/leaderboards/${id}/users`)
      .pipe(
        map((res) => res.data)
      )
  }

}
