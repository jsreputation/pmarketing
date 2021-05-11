import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBadgeService } from './badge.service';

@Injectable({
  providedIn: 'root'
})
export class V4BadgeService implements IBadgeService {
  // private hostName: string;

  constructor(
    // private http: HttpClient,
    // private configService: ConfigService
  ) {
    // this.configService.readAppConfig().subscribe(
    //   (config: IConfig<void>) => {
    //     this.hostName = config.apiHost as string;
    //   });
  }

  public getAchievedBadgeCount(): Observable<number> {
    return of(Math.floor(Math.random() * (25 - 0 + 1)) + 0);
    // return this.http.get<IV4BadgeResponse>(`${this.hostName}/v4/user_quests`)
    //   .pipe(
    //     map((badges) =>
    //       // Math.floor(Math.random() * (25 - 0 + 1)) + 0
    //       badges.meta.count
    //     ));
  }
}

export interface IV4BadgeResponse {
  data: any;
  meta: {
    count: number;
  };
}
