import { Injectable } from '@angular/core';
import { IQuestService } from './quest.service';
import { IQuest, IQuestTask } from './quest.model';
import { ICampaign, CampaignType, CampaignState } from '../campaign/models/campaign.model';
import { IV4Campaign } from '../campaign/v4-campaign.service';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { V4CampaignService } from '../campaign/v4-campaign.service';

@Injectable({
  providedIn: 'root'
})
export class V4QuestService implements IQuestService {
  private hostName: string;

  public v4QuestCampaigns: IV4Campaign[] = [{
      id: 1,
      name: 'Quest Campaign Name 1',
      description: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
      campaign_type:  CampaignType.quest,
      state:  CampaignState.active,
      begins_at: '2020-06-26T08:46:06.000Z',
      ends_at:  '2021-06-26T08:46:06.000Z',
      enrolled: false,
      favourite: false,
      custom_fields: {},
      category_tags: [],
      tags: [],
      referral_code: '',
      terms_and_conditions: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
      images:  [{
        type: 'campaign_banner',
        url: 'https://via.placeholder.com/150'
      }],
      rewards: [{
        id: 3,
        name: 'Free 6-mth Membership Fee',
        description: 'desc',
        subtitle: 'subtitle',
        valid_from: new Date('01/02/2021'),
        valid_to: new Date('02/02/2022'),
        loyalty: [],
        terms_and_conditions: 'tnc',
        is_favorite: false
      },
      {
        id: 5,
        name: '20% Off on Total Bill',
        description: 'desc',
        subtitle: 'subtitle',
        valid_from: new Date('01/02/2021'),
        valid_to: new Date('02/02/2022'),
        loyalty: [],
        terms_and_conditions: 'tnc',
        is_favorite: false
      }]
  },
  {
    id: 2,
    name: 'Quest Campaign Name 2',
    description: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
    campaign_type:  CampaignType.quest,
    state:  CampaignState.active,
    begins_at: '2020-06-26T08:46:06.000Z',
    ends_at:  '2021-06-26T08:46:06.000Z',
    enrolled: true,
    favourite: false,
    custom_fields: {},
    category_tags: [],
    tags: [],
    referral_code: '',
    terms_and_conditions: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
    images:  [{
      type: 'campaign_banner',
      url: 'https://via.placeholder.com/150'
    }],
    rewards: [{
      id: 3,
      name: 'Free 6-mth Membership Fee',
      description: 'desc',
      subtitle: 'subtitle',
      valid_from: new Date('01/02/2021'),
      valid_to: new Date('02/02/2022'),
      loyalty: [],
      terms_and_conditions: 'tnc',
      is_favorite: false
    },
    {
      id: 5,
      name: '20% Off on Total Bill',
      description: 'desc',
      subtitle: 'subtitle',
      valid_from: new Date('01/02/2021'),
      valid_to: new Date('02/02/2022'),
      loyalty: [],
      terms_and_conditions: 'tnc',
      is_favorite: false
    }]
},
{
  id: 3,
  name: 'Quest Campaign Name 3',
  description: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
  campaign_type:  CampaignType.quest,
  state:  CampaignState.active,
  begins_at: '2020-06-26T08:46:06.000Z',
  ends_at:  '2021-06-26T08:46:06.000Z',
  enrolled: true,
  favourite: false,
  custom_fields: {},
  category_tags: [],
  tags: [],
  referral_code: '',
  terms_and_conditions: 'Lorem ipsum dolores ennui monothermal lido simian monte.',
  images:  [{
    type: 'campaign_banner',
    url: 'https://via.placeholder.com/150'
  }],
  rewards: [{
    id: 3,
    name: 'Free 6-mth Membership Fee',
    description: 'desc',
    subtitle: 'subtitle',
    valid_from: new Date('01/02/2021'),
    valid_to: new Date('02/02/2022'),
    loyalty: [],
    terms_and_conditions: 'tnc',
    is_favorite: false
  },
  {
    id: 5,
    name: '20% Off on Total Bill',
    description: 'desc',
    subtitle: 'subtitle',
    valid_from: new Date('01/02/2021'),
    valid_to: new Date('02/02/2022'),
    loyalty: [],
    terms_and_conditions: 'tnc',
    is_favorite: false
  }]
}];

  public quests: IV4Quest[] = [
    {
      id: 11,
      campaign_id: 1,
      quest_display_properties: {
        quest_completed_img_url: 'https://dummyimage.com/150X150/19c419/000800'

      },
      tasks : [{
        id: 100,
        name: 'Task1 title',
        description: 'Task1 subtitle',
        completed_at: undefined,
        display_properties: {
          image_url: 'https://dummyimage.com/150X150/4a4a80/000800'
        }
      },
      {
        id: 101,
        name: 'Task2 title',
        description: 'Task2 subtitle',
        completed_at: undefined,
        display_properties: {
          image_url: 'https://dummyimage.com/150X150/888096/000800'
        }
      },
      {
        id: 102,
        name: 'Task3 title',
        description: 'Task3 subtitle',
        completed_at: undefined,
        display_properties: {
          image_url: 'https://dummyimage.com/150X150/cac3db/000800'
        }
      }
    ],
    },
    {
      id: 12,
      campaign_id: 2,
      quest_display_properties: {
        quest_completed_img_url: 'https://dummyimage.com/150X150/19c419/000800'

      },
    tasks : [{
      id: 100,
      name: 'Task1 title',
      description: 'Task1 subtitle',
      completed_at: new Date('02/02/2021'),
      display_properties: {
        image_url: 'https://dummyimage.com/150X150/4a4a80/000800'
      }
    },
    {
      id: 101,
      name: 'Task2 title',
      description: 'Task2 subtitle',
      completed_at: new Date('02/02/2021'),
      display_properties: {
        image_url: 'https://dummyimage.com/150X150/888096/000800'
      }
    },
    {
      id: 102,
      name: 'Task3 title',
      description: 'Task3 subtitle',
      completed_at: undefined,
      display_properties: {
        image_url: 'https://dummyimage.com/150X150/cac3db/000800'
      }
    }
  ],
  },
  {
    id: 13,
    campaign_id: 3,
    quest_display_properties: {
      quest_completed_img_url: 'https://dummyimage.com/150X150/19c419/000800'

    },
    tasks : [{
      id: 100,
      name: 'Task1 title',
      description: 'Task1 subtitle',
      completed_at: new Date('02/02/2021'),
      display_properties: {
        image_url: 'https://dummyimage.com/150X150/4a4a80/000800'
      }
    },
    {
      id: 101,
      name: 'Task2 title',
      description: 'Task2 subtitle',
      completed_at: new Date('02/02/2021'),
      display_properties: {
        image_url: 'https://dummyimage.com/150X150/888096/000800'
      }
    },
    {
      id: 102,
      name: 'Task3 title',
      description: 'Task3 subtitle',
      completed_at: new Date('02/02/2021'),
      display_properties: {
        image_url: 'https://dummyimage.com/150X150/cac3db/000800'
      }
    }
  ],
  }];

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.hostName = config.apiHost as string;
      });
  }

  public  getQuestCampaigns(): Observable<ICampaign[]> {
    return of(this.v4QuestCampaigns)
      .pipe(
        map((campaigns: IV4Campaign[]) =>
          campaigns.map(campaign =>
            V4CampaignService.v4CampaignToCampaign(campaign)
          )
        )
      );
  }

  public  getQuestCampaign(campainId: number): Observable<ICampaign> {
    return of(this.v4QuestCampaigns[campainId - 1])
      .pipe(
        map((campaign: IV4Campaign) => V4CampaignService.v4CampaignToCampaign(campaign)
        )
      );
  }

  public  getQuestFromCampaign(campaign: ICampaign): Observable<IQuest> {
    return of(this.quests[(campaign.id - 1)])
    .pipe(
      map((quest: IV4Quest) => V4QuestService.v4QuestToQuest(quest, campaign)));
    /* return this.http.get<QuestsResponse>(`${this.hostName}/v4/campaigns/${campaignId}/user_quests`)
      .pipe(
        map(res => res.data),
        map((quest: Quest) => V4QuestService.v4QuestToQuest(quest, campaign)))
      ); */
  }


  public  postEnrollQuest(campaignId: number): Observable<any> {
    this.http.post(`${this.hostName}/v4/campaigns/${campaignId}/enrol`, null);
    return of([]);
  }

   private static v4QuestToQuest(quest: IV4Quest, campaign: ICampaign): IQuest {

    const questTasks =  quest.tasks && quest.tasks.map(task => V4QuestService.v4QuestTaskToQuestTask(task));


    return {
      id: quest.id,
      campaignId: campaign.id,
      campaignName: campaign.name,
      campaignDescription: campaign.description ? campaign.description : '',
      campaignBannerUrl: campaign.campaignBannerUrl,
      enrolled: campaign.enrolled ? campaign.enrolled : false,
      endsAt: campaign.endsAt ? campaign.endsAt : undefined,
      tasks: questTasks,
      questDisplayProperties: {
        questCompletedImgUrl: quest.quest_display_properties ?
        quest.quest_display_properties.quest_completed_img_url : ''
      },
      termsAndCondtions: campaign.termsAndConditions,
      rewards: campaign.rewards
    };
  }

  private static v4QuestTaskToQuestTask(quest: IV4QuestTask): IQuestTask {
    return {
          id: quest.id,
          name: quest.name,
          description: quest.description,
          displayProperties: {
              imageUrl: quest.display_properties.image_url
          },
          state: quest.completed_at ? 'completed' : 'incomplete'
    };
  }
}

export interface IV4Quest {
  id: number;
  campaign_id: number;
  tasks?: IV4QuestTask[];
  quest_display_properties?: {
    quest_completed_img_url: string;
  };
}

export interface IV4QuestTask {
  id: number;
  name: string;
  description: string;
  display_properties: {
      image_url: string;
  };
  completed_at: Date | undefined;
}

export interface IV4QuestResponse {
  data: IV4Quest;
  meta: {
    count: number;
  };
}
