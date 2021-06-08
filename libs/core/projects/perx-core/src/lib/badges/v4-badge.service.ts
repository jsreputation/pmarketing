import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { Asset } from '../game/v4-game.service';
import { IBadgeService } from './badge.service';
import { IBadge } from './models/badge.model';

@Injectable({
  providedIn: 'root'
})
export class V4BadgeService implements IBadgeService {
  private hostName: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.hostName = config.apiHost as string;
      });
  }


  private static V4BadgeToIBadge(badges: IV4Badge[]): IBadge[] {
    return badges.map((badge) => ({
      id: badge.id,
      active: badge.issued,
      title: badge.name,
      description: badge?.description,
      image: badge.issued ?
        badge.display_properties.earned_icon : badge.display_properties.unearned_icon
    }));
  }

  public getAllBadges(): Observable<IBadge[]> {
    return this.http.get<IV4BadgeResponse>(`${this.hostName}/v4/badges`)
      .pipe(
        map((res) => res.data),
        map((badges) => V4BadgeService.V4BadgeToIBadge(badges)),
      );
  }

  public getAchievedBadgeCount(): Observable<number> {
    // TODO: Query with filter
    return this.http.get<IV4BadgeResponse>(`${this.hostName}/v4/badges`)
      .pipe(map((badges) => badges.meta.count));
  }
}

export interface IV4BadgeResponse {
  data: IV4Badge[];
  meta: {
    count: number;
  };
}

interface IV4Badge {
  id: number;
  description: string;
  display_properties: {
    unearned_icon: Asset;
    earned_icon: Asset;
  };
  issued: boolean;
  name: string;
}
