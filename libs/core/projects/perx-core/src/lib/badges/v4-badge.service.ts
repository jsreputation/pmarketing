import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBadgeService } from './badge.service';
import { BadgeState, IBadge } from './models/badge.model';

@Injectable({
  providedIn: 'root'
})
export class V4BadgeService implements IBadgeService {
  // private hostName: string;
  private mockbadges: IBadge[] = [
    {
      id: 1,
      active: true,
      title: 'Mock Title 1 with extra text to test ellipsis',
      description: 'Mock Description',
      image: {
        type: '',
        value: {
          file: '',
          filename: '',
          image_id: 1,
          image_url: `https://i.pravatar.cc/200?${this.radomnum()}`
        }
      }
    },
    {
      id: 1,
      active: false,
      title: 'Mock Title 2',
      description: 'Mock Description 1',
      image: {
        type: '',
        value: {
          file: '',
          filename: '',
          image_id: 1,
          image_url: `https://i.pravatar.cc/200?${this.radomnum()}`
        }
      }
    },
    {
      id: 1,
      active: true,
      title: 'Mock Title 3',
      description: 'Mock Description 3',
      image: {
        type: '',
        value: {
          file: '',
          filename: '',
          image_id: 1,
          image_url: `https://i.pravatar.cc/200?${this.radomnum()}`
        }
      }
    },
    {
      id: 1,
      active: true,
      title: 'Mock Title 4',
      description: 'Mock Description 4',
      image: {
        type: '',
        value: {
          file: '',
          filename: '',
          image_id: 1,
          image_url: `https://i.pravatar.cc/200?${this.radomnum()}`
        }
      }
    },
    {
      id: 1,
      active: false,
      title: 'Mock Title 5',
      description: 'Mock Description 5',
      image: {
        type: '',
        value: {
          file: '',
          filename: '',
          image_id: 1,
          image_url: `https://i.pravatar.cc/200?${this.radomnum()}`
        }
      }
    }
  ];

  private radomnum(): number {
    return Math.floor(Math.random() * (25 - 0 + 1)) + 0;
  }

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

  public getBadgesByState(state?: BadgeState): Observable<IBadge[]> {
    console.log(state);
    return of(this.mockbadges);
  }
}

export interface IV4BadgeResponse {
  data: any;
  meta: {
    count: number;
  };
}
