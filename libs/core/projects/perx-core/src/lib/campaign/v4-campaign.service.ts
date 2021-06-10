import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  CampaignDisplayProperties,
  IPointsOutcome,
  CampaignOutcomeType,
  CampaignState,
  CampaignType,
  ICampaign,
  ICampaignOutcome,
  IReferral,
  IBadgeOutcome
} from './models/campaign.model';
import { OutcomeType } from '../outcome/models/outcome.model';
import { ICampaignFilterOptions, ICampaignService } from './icampaign.service';
import { IV4Reward, V4RewardsService } from '../rewards/v4-rewards.service';
import { oc } from 'ts-optchain';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import {
  GameProperties,
  PinataDisplayProperties,
  ScratchDisplayProperties,
  SpinDisplayProperties,
  TreeDisplayProperties
} from '../game/v4-game.service';
import { QuizDisplayProperties } from '../quiz/v4-quiz.service';
import { GameType } from '../game/game.model';
import { patchUrl } from '../utils/patch-url.function';
import { Cacheable } from 'ngx-cacheable';
import { QuestDisplayProperties } from '../quest/v4-quest.service';

interface IV4Image {
  type: string;
  url: string;
}

export interface IV4OperatingHours {
  id: number;
  // is UTC DateTime from BE, but we'll only use the time portion
  closes_at: Date;
  opens_at: Date;
  days: number[]; // expects 0 - 6, Sunday - Saturday
}

/* eslint-disable @typescript-eslint/indent */
type DisplayProperties = TreeDisplayProperties |
  PinataDisplayProperties |
  ScratchDisplayProperties |
  SpinDisplayProperties |
  QuizDisplayProperties |
  QuestDisplayProperties;
/* eslint-enable @typescript-eslint/indent */

type CampaignConfig = {
  campaign_results: { count: number, first_result_id: number };
  referral_type: string;
  referral_codes: string[];
  referees_attained: number;
  referral_rewards?: IV4Reward[];
};

export interface IV4Campaign {
  id: number;
  name: string;
  description: string;
  begins_at: string;
  ends_at?: string;
  enrolled: boolean;
  campaign_type: CampaignType;
  game_type?: string;
  images: IV4Image[];
  favourite: boolean;
  custom_fields: any;
  category_tags: any[];
  tags: any[];
  state: CampaignState;
  rewards?: IV4Reward[];
  display_properties?: DisplayProperties | null;
  campaign_referral_type?: string;
  campaign_config?: CampaignConfig;
  referral_code: string;
  terms_and_conditions?: string;
  operating_hour?: IV4OperatingHours;
  operating_now?: boolean;
}

type CountObject = {
  count: number;
};

export interface IV4CampaignResponse {
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

export interface IV4CampaignOutcomeResponse {
  data: IV4CampaignOutcome[];
}

export interface IV4CampaignOutcome {
  id: number;
  modularizable_id: number;
  modularizable_type: CampaignOutcomeType;
  outcome: IV4CampaignOutcomeItem;
  points_count?: number;
}

export interface IV4CampaignOutcomeItem {
  id: number;
  name: string;
  type: CampaignOutcomeType;
}
export interface IV4PointsOutcome {
  id: number;
  outcome_type: OutcomeType.points;
  points: number;
  properties: any;
}

export interface IV4BadgeOutcome {
  id: number;
  outcome_type: OutcomeType.badge;
  badge_id: number;
  state: 'issued' | 'unissued';
}

const campaignsCacheBuster: Subject<boolean> = new Subject();

@Injectable({ providedIn: 'root' })
export class V4CampaignService implements ICampaignService {
  public campaignsCache: Observable<ICampaign>[] = [];
  public baseUrl: string;
  private lang: string = 'en';

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<any>) => this.baseUrl = config.apiHost as string);
  }

  public static v4CampaignToCampaign(campaign: IV4Campaign, lang: string = 'en'): ICampaign {

    const customFields = campaign.custom_fields;
    const thumbnail = campaign.images.find(image =>
      ['catalog_thumbnail', 'campaign_thumbnail'].some(ty => ty === image.type)
    );
    const thumbnailUrl = oc(thumbnail).url();
    const campaignBanner = campaign.images.find(i =>
      ['campaign_banner', 'header'].some(ty => ty === i.type)
    );
    let campaignBannerUrl = oc(campaignBanner).url();
    if (campaignBannerUrl) {
      campaignBannerUrl = patchUrl(campaignBannerUrl);
    }
    const rewards =
      campaign.rewards &&
      campaign.rewards.map((reward: IV4Reward) =>
        V4RewardsService.v4RewardToReward(reward, campaign.campaign_type)
      );
    let displayProperties: CampaignDisplayProperties | undefined;
    const dp: DisplayProperties | null = campaign.display_properties || null;
    if (dp && (dp as QuizDisplayProperties).landing_page) {
      const lp = (dp as QuizDisplayProperties).landing_page;
      displayProperties = {
        landingPage: {
          body: lp.body[lang],
          buttonText: lp.button_text[lang]
        }
      };
      let youtubeUrl = oc(lp).media.youtube() || null;
      if (youtubeUrl) {
        youtubeUrl = youtubeUrl.replace('/watch?v=', '/embed/');

        // @ts-ignore
        displayProperties.landingPage.media = { youtube: youtubeUrl };
      }
    }
    if (dp && (dp as GameProperties).background_image) {
      if (displayProperties === undefined) {
        displayProperties = {
          landingPage: {}
        };
      }
      // @ts-ignore
      displayProperties.landingPage.backgroundUrl = patchUrl(
        oc(dp as GameProperties).background_image.value.image_url('')
      );
    }

    if (dp && ((dp as QuestDisplayProperties).header || (dp as QuestDisplayProperties).body ||
      (dp as QuestDisplayProperties).image || (dp as QuestDisplayProperties).quest_success_image)) {
      const qp = (dp as QuestDisplayProperties);
      displayProperties = {
        questDetails: {}
      };
      if (qp.header) {
        displayProperties.questDetails = {
          title: qp.header.value.title,
          description: qp.header.value.description
        };
      }
      if (qp.body) {
        // @ts-ignore
        displayProperties.questDetails.body = qp.body;
      }
      if (qp.image) {
        // @ts-ignore
        displayProperties.questDetails.imageUrl = qp.image.value.image_url || qp.image.value.file;
      }
      if (qp.quest_success_image) {
        // @ts-ignore
        displayProperties.questDetails.successImageUrl = qp.quest_success_image.value.image_url || qp.quest_success_image.value.file;
      }
    }

    let referralCodes, refersAttained;
    referralCodes = [campaign.referral_code];
    if (campaign.campaign_config) {
      if (campaign.campaign_config.referral_codes) {
        referralCodes = [...referralCodes, ...campaign.campaign_config.referral_codes];
      }
      if (campaign.campaign_config.referees_attained !== null || undefined) {
        refersAttained = campaign.campaign_config.referees_attained;
      }
    }

    let operatingHours;
    if (campaign.operating_hour) {
      operatingHours = {
        id: campaign.operating_hour.id,
        closesAt: campaign.operating_hour.closes_at,
        opensAt: campaign.operating_hour.opens_at,
        days: campaign.operating_hour.days
      };
    }

    return {
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      type: campaign.campaign_type,
      subType: oc(campaign).game_type(),
      state: campaign.state,
      endsAt: campaign.ends_at ? new Date(campaign.ends_at) : null,
      beginsAt: campaign.begins_at ? new Date(campaign.begins_at) : null,
      enrolled: campaign.enrolled,
      termsAndConditions: campaign.terms_and_conditions,
      referralCodes,
      refersAttained,
      rewards,
      thumbnailUrl,
      campaignBannerUrl,
      operatingHours,
      isOperating: campaign.operating_now,
      displayProperties,
      customFields
    };
  }

  @Cacheable({
    cacheBusterObserver: campaignsCacheBuster,
    maxCacheCount: 50,
    maxAge: 300000 // 5 minutes
  })
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
            V4CampaignService.v4CampaignToCampaign(campaign, this.lang)
          )
        )
      );
  }

  // if need be call method here to clear campaignsCache
  public clearCampaignCache(): void {
    campaignsCacheBuster.next(true);
  }

  @Cacheable({
    cacheBusterObserver: campaignsCacheBuster,
    maxCacheCount: 100,
    maxAge: 300000
  })
  public getCampaign(id: number): Observable<ICampaign> {
    if (this.campaignsCache[id]) {
      return this.campaignsCache[id];
    }
    return this.campaignsCache[id] = this.http
      .get<IV4CampaignResponse>(`${this.baseUrl}/v4/campaigns/${id}`)
      .pipe(
        map(resp => resp.data),
        map((campaign: IV4Campaign) =>
          V4CampaignService.v4CampaignToCampaign(campaign, this.lang)
        ),
        catchError(_ => {
          delete this.campaignsCache[id];
          return EMPTY;
        })
      );
  }

  public getVoucherLeftCount(campaignId: number): Observable<{ count: number; campaignId: number }> {
    return this.http.get(`${this.baseUrl}/v4/campaigns/${campaignId}/voucher_count`).pipe(
      map((res: { data: CountObject }) => res.data),
      map((countObj: CountObject) => ({ ...countObj, campaignId }))
    );
  }

  // api 404 and WIP response. type any for the moment
  public applyReferral(referralCode: string): Observable<IReferral> {
    const referralBody = {
      referral_code: referralCode
    };
    return this.http.post(`${this.baseUrl}/v4/campaigns/referral`, referralBody).pipe(
      catchError(e => of(e))
    );
  }

  public getCampaignOutcomes(id: number): Observable<ICampaignOutcome[]> {
    return this.http
      .get<IV4CampaignOutcomeResponse>(`${this.baseUrl}/v4/campaigns/${id}/outcomes`)
      .pipe(
        map(resp => resp.data),
        map((campaignOutcomes: IV4CampaignOutcome[]) => campaignOutcomes.filter(o => o.modularizable_type === CampaignOutcomeType.reward
          || o.modularizable_type === CampaignOutcomeType.points || o.modularizable_type === CampaignOutcomeType.prizeSet)),
        map((campaignOutcomes: IV4CampaignOutcome[]) =>
          campaignOutcomes.map(campaignOutcome =>
            V4CampaignService.v4CampaignOutcomeToCampaignOutcome(campaignOutcome)
          )
        ),
        catchError(e => of(e))
      );
  }

  public static v4CampaignOutcomeToCampaignOutcome(campaignOutcome: IV4CampaignOutcome): ICampaignOutcome {
    return {
      id: campaignOutcome.modularizable_id,
      type: campaignOutcome.modularizable_type,
      name: campaignOutcome.outcome ? campaignOutcome.outcome.name : '',
      pointsCount: campaignOutcome.points_count
    };
  }

  public static v4PointsToPoints(points: IV4PointsOutcome): IPointsOutcome {
    return {
      id: points.id,
      outcomeType: points.outcome_type,
      points: points.points,
      properties: points.properties
    };
  }

  public static v4BadgeToBadge(badge: IV4BadgeOutcome): IBadgeOutcome {
    return {
      id: badge.id,
      outcomeType: badge.outcome_type,
      badgeId: badge.badge_id,
      state: badge.state
    };
  }
}
