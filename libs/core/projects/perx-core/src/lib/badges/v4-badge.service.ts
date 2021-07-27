import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { Asset } from '../game/v4-game.service';
import { BadgeService } from './badge.service';
import { IBadge } from './models/badge.model';

@Injectable({
  providedIn: 'root'
})
export class V4BadgeService implements BadgeService {
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


  private static V4BadgeToIBadge(badge: IV4Badge): IBadge {
    return {
      id: badge.id,
      active: badge.issued,
      title: badge.name,
      description: badge?.description,
      image: badge.issued ?
        badge.display_properties?.earned_icon : badge.display_properties?.unearned_icon
    };
  }

  public getAllBadges(page: number = 1, pageSize: number = 25): Observable<IBadge[]> {
    return this.http.get<IV4BadgeListResponse>(`${this.hostName}/v4/badges`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      })
      .pipe(
        map((res) => res.data),
        map((badges) => badges.map((badge) => V4BadgeService.V4BadgeToIBadge(badge))),
      );
  }

  public getBadgesByState(earned: boolean, page: number = 1, pageSize: number = 25): Observable<IBadge[]> {
    return this.http.get<IV4BadgeListResponse>(`${this.hostName}/v4/badges`,
      {
        params: {
          earned: `${earned}`,
          page: `${page}`,
          size: `${pageSize}`
        }
      })
      .pipe(
        map((res) => res.data),
        map((badges) => badges.map((badge) => V4BadgeService.V4BadgeToIBadge(badge))),
      );
  }

  public getAchievedBadgeCount(): Observable<number> {
    return this.http.get<IV4BadgeListResponse>(`${this.hostName}/v4/badges?earned=true`)
      .pipe(map((badges) => badges.meta.total_count));
  }

  public getBadge(id: number): Observable<IBadge> {
    return this.http.get<IV4BadgeResponse>(`${this.hostName}/v4/badges/${id}`)
      .pipe(
        map((res) => res.data),
        map((badge: IV4Badge) => V4BadgeService.V4BadgeToIBadge(badge))
      )
  }
}

export interface IV4BadgeListResponse {
  data: IV4Badge[];
  meta: {
    total_count: number;
  };
}

export interface IV4BadgeResponse {
  data: IV4Badge;
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
