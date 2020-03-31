import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {
  ICampaign,
  CampaignType,
  CampaignState,
  CampaignDisplayProperties
} from './models/campaign.model';
import { ICampaignFilterOptions, ICampaignService } from './icampaign.service';
import { V4RewardsService, IV4Reward } from '../rewards/v4-rewards.service';
import { oc } from 'ts-optchain';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import { TreeDisplayProperties, PinataDisplayProperties, ScratchDisplayProperties, SpinDisplayProperties } from '../game/v4-game.service';
import { QuizDisplayProperties } from '../quiz/v4-quiz.service';
import { GameType } from '../game/game.model';

interface IV4Image {
  type: string;
  url: string;
}

type DisplayProperties = TreeDisplayProperties |
PinataDisplayProperties |
ScratchDisplayProperties |
SpinDisplayProperties |
QuizDisplayProperties;

interface IV4Campaign {
  id: number;
  name: string;
  description: string;
  begins_at: string;
  ends_at?: string;
  enrolled: boolean;
  campaign_type: CampaignType;
  images: IV4Image[];
  favourite: boolean;
  custom_fields: any;
  category_tags: any[];
  tags: any[];
  state: CampaignState;
  rewards?: IV4Reward[];
  display_properties?: DisplayProperties | null;
}

interface IV4CampaignResponse {
  data: IV4Campaign;
  meta: {
    count: number;
  };
}

interface IV4CampaignsResponse {
  data: IV4Campaign[];
  meta: {
    count: number;
  };
}

@Injectable({ providedIn: 'root' })
export class V4CampaignService implements ICampaignService {
  public campaignsCache: Observable<ICampaign>[] = [];
  public baseUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.baseUrl = config.apiHost as string;
      });
  }

  public static v4CampaignToCampaign(campaign: IV4Campaign): ICampaign {
    const thumbnail = campaign.images.find(image =>
      ['catalog_thumbnail', 'campaign_thumbnail'].some(ty => ty === image.type)
    );
    const thumbnailUrl = oc(thumbnail).url();
    const campaignBanner = campaign.images.find(i =>
      ['campaign_banner', 'header'].some(ty => ty === i.type)
    );
    const campaignBannerUrl = oc(campaignBanner).url();
    const rewards =
      campaign.rewards &&
      campaign.rewards.map((reward: IV4Reward) =>
        V4RewardsService.v4RewardToReward(reward)
      );
    let displayProperties: CampaignDisplayProperties | undefined;
    const dp: DisplayProperties | null = campaign.display_properties || null;
    if (dp && (dp as QuizDisplayProperties).landing_page) {
      const lp = (dp as QuizDisplayProperties).landing_page;
      displayProperties = {
        landingPage: {
          body: lp.body,
          heading: lp.heading,
          subHeading: lp.sub_heading,
          buttonText: lp.button_text
        }
      };
      let youtubeUrl = oc(lp).media.youtube() || null;
      if (youtubeUrl) {
        // youtubeUrl = 'https://www.youtube.com/watch?v=r6BqFtRCr_A';
        youtubeUrl = youtubeUrl.replace('/watch?v=', '/embed/');

        // @ts-ignore
        displayProperties.landingPage.media = { youtube: youtubeUrl };
      }
    }

    return {
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      type: campaign.campaign_type,
      state: campaign.state,
      endsAt: campaign.ends_at ? new Date(campaign.ends_at) : null,
      beginsAt: campaign.begins_at ? new Date(campaign.begins_at) : null,
      rewards,
      thumbnailUrl,
      campaignBannerUrl,
      displayProperties
    };
  }

  public getCampaigns(
    filterOptions?: ICampaignFilterOptions
  ): Observable<ICampaign[]> {
    let params = new HttpParams();
    if (filterOptions) {
      Object.keys(filterOptions).forEach(key => {
        if (filterOptions.hasOwnProperty(key)) {
          if (key === 'type') {
            params = params.set('campaign_type', filterOptions[key] || '');
          } else if (key === 'gameType') {
            if (filterOptions.gameType !== GameType.unknown) {
              params = params.set('game_type', filterOptions.gameType || '');
            }
          } else {
            params = params.set(key, filterOptions[key]);
          }
        }
      });
    }
    return this.http
      .get<IV4CampaignsResponse>(`${this.baseUrl}/v4/campaigns`, { params })
      .pipe(
        map(resp => resp.data),
        map((campaigns: IV4Campaign[]) =>
          campaigns.map(campaign =>
            V4CampaignService.v4CampaignToCampaign(campaign)
          )
        )
      );
  }

  public getCampaign(id: number): Observable<ICampaign> {
    if (this.campaignsCache[id]) {
      return this.campaignsCache[id];
    }
    return this.campaignsCache[id] = this.http
      .get<IV4CampaignResponse>(`${this.baseUrl}/v4/campaigns/${id}`)
      .pipe(
        map(resp => resp.data),
        map((campaign: IV4Campaign) =>
          V4CampaignService.v4CampaignToCampaign(campaign)
        ),
        shareReplay(1),
        catchError(_ => {
          delete this.campaignsCache[id];
          return EMPTY;
        })
      );
  }
}
