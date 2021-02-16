import { Injectable } from '@angular/core';
import { IQuestService } from './quest.service';
import { IQuestCampaign } from './quest.model';
import { ICampaign, CampaignType, CampaignState } from '../campaign/models/campaign.model';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class V4QuestService implements IQuestService {
  private hostName: string;

  public quests: IQuestCampaign[] = [
    {
      id: 1,
      name: 'Quest Name 1',
      description: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
      tnc: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
      type:  CampaignType.quest,
      state:  CampaignState.active,
      endsAt:  new Date('02/05/2021'),
      campaignBannerUrl: 'https://via.placeholder.com/150',
      rewards: [{
        id: 5,
        name: 'Free 6-mth Membership Fee',
        description: 'desc',
        subtitle: 'subtitle',
        validFrom: null,
        validTo: null,
        rewardBanner: '',
        loyalty: [],
        termsAndConditions: 'tnc'
      },
      {
        id: 3,
        name: '20% Off on Total Bill',
        description: 'desc',
        subtitle: 'subtitle',
        validFrom: null,
        validTo: null,
        rewardBanner: '',
        loyalty: [],
        termsAndConditions: 'tnc'
      }],
      tasks : [{
        name: 'task1',
        description: 'task1 desc',
        completedAt: new Date('02/02/2021'),
        displayProperties: {
          position: 1,
          imageUrl: 'https://via.placeholder.com/150'
        }
      },
      {
        name: 'task2',
        description: 'task2 desc',
        completedAt: new Date('02/02/2021'),
        displayProperties: {
          position: 2,
          imageUrl: 'https://via.placeholder.com/150'
        }
      },
      {
        name: 'task3',
        description: 'task3 desc',
        completedAt: new Date('02/02/2021'),
        displayProperties: {
          position: 3,
          imageUrl: 'https://via.placeholder.com/150'
        }
      }
    ],
      // campaignBannerUrl?: string;
      // displayProperties?: CampaignDisplayProperties,
      // customFields?: any;
      enrolled: true
    },
    {
    id: 2,
    name: 'Quest Name 2',
    description: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
    tnc: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
    type:  CampaignType.quest,
    state:  CampaignState.active,
    endsAt:  new Date('02/05/2021'),
    campaignBannerUrl: 'https://via.placeholder.com/150',
    rewards: [{
      id: 5,
      name: 'Free 6-mth Membership Fee',
      description: 'desc',
      subtitle: 'subtitle',
      validFrom: null,
      validTo: null,
      rewardBanner: '',
      loyalty: [],
      termsAndConditions: 'tnc'
    },
    {
      id: 3,
      name: '20% Off on Total Bill',
      description: 'desc',
      subtitle: 'subtitle',
      validFrom: null,
      validTo: null,
      rewardBanner: '',
      loyalty: [],
      termsAndConditions: 'tnc'
    }],
    tasks : [{
      name: 'task1',
      description: 'task1 desc',
      completedAt: new Date('02/02/2021'),
      displayProperties: {
        position: 1,
        imageUrl: 'https://via.placeholder.com/150'
      }
    },
    {
      name: 'task2',
      description: 'task2 desc',
      completedAt: new Date('02/02/2021'),
      displayProperties: {
        position: 2,
        imageUrl: 'https://via.placeholder.com/150'
      }
    },
    {
      name: 'task3',
      description: 'task3 desc',
      completedAt: undefined,
      displayProperties: {
        position: 3,
        imageUrl: 'https://via.placeholder.com/150'
      }
    }
  ],
    // campaignBannerUrl?: string;
    // displayProperties?: CampaignDisplayProperties,
    // customFields?: any;
    enrolled: true
  },
  {
    id: 3,
    name: 'Quest Name 3',
    description: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
    tnc: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
    type:  CampaignType.quest,
    state:  CampaignState.active,
    endsAt:  new Date('02/05/2021'),
    campaignBannerUrl: 'https://via.placeholder.com/150',
    rewards: [{
      id: 5,
      name: 'Free 6-mth Membership Fee',
      description: 'desc',
      subtitle: 'subtitle',
      validFrom: null,
      validTo: null,
      rewardBanner: '',
      loyalty: [],
      termsAndConditions: 'tnc'
    },
    {
      id: 3,
      name: '20% Off on Total Bill',
      description: 'desc',
      subtitle: 'subtitle',
      validFrom: null,
      validTo: null,
      rewardBanner: '',
      loyalty: [],
      termsAndConditions: 'tnc'
    }],
    tasks : [{
      name: 'task1',
      description: 'task1 desc',
      completedAt: undefined,
      displayProperties: {
        position: 1,
        imageUrl: 'https://via.placeholder.com/150'
      }
    },
    {
      name: 'task2',
      description: 'task2 desc',
      completedAt: undefined,
      displayProperties: {
        position: 2,
        imageUrl: 'https://via.placeholder.com/150'
      }
    },
    {
      name: 'task3',
      description: 'task3 desc',
      completedAt: undefined,
      displayProperties: {
        position: 3,
        imageUrl: 'https://via.placeholder.com/150'
      }
    }
  ],
  questDisplayProperties: {
    questCompletedImgUrl: 'https://via.placeholder.com/150'
  },
    // campaignBannerUrl?: string;
    // displayProperties?: CampaignDisplayProperties,
    // customFields?: any;
    enrolled: false
  }];

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.hostName = config.apiHost as string;
      });
  }

  public  getQuestCampaigns(): Observable<ICampaign[]> {
    return of(this.quests);
  }

  public  getQuestsFromCampaign(campaignId: number): Observable<ICampaign> {
    return of(this.quests[campaignId - 1]);
    /* return this.http.get<QuestsResponse>(`${this.hostName}/v4/campaigns/${campaignId}/user_quests`)
      .pipe(
        map(res => res.data),
        map((quests: Quests[]) => quests.map((quest: Quest): IQuest => V4QuestService.v4QuestToQuest(quest, campaign)))
      ); */
  }

  public get(questId: number): Observable<IQuestCampaign> {
    /* return this.http.get<QuestResponse>(`${this.hostName}/v4/user_quests/${questId}`)
      .pipe(
        map(res => res.data),
        map(quest => V4QuestService.v4QuestToQuest(quest))
      );*/
      return of(this.quests[questId]);
  }

  public  postEnrollQuest(campaignId: number): void {
     this.http.post(`${this.hostName}/v4/campaigns/${campaignId}/enrol`, null);

  }

  /* private static v4QuestToQuest(quest: IV4Quest): IQuest {

  }*/

}

