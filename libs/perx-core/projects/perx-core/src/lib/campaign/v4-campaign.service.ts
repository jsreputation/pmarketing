import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {
  ICampaign,
  CampaignType,
  CampaignState,
  CampaignDisplayProperties,
  IReferral
} from './models/campaign.model';
import { ICampaignFilterOptions, ICampaignService } from './icampaign.service';
import { V4RewardsService, IV4Reward } from '../rewards/v4-rewards.service';
import { oc } from 'ts-optchain';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import { TreeDisplayProperties, PinataDisplayProperties, ScratchDisplayProperties, SpinDisplayProperties, GameProperties } from '../game/v4-game.service';
import { QuizDisplayProperties } from '../quiz/v4-quiz.service';
import { GameType } from '../game/game.model';
import { patchUrl } from '../utils/patch-url.function';

interface IV4Image {
  type: string;
  url: string;
}

/* eslint-disable @typescript-eslint/indent */
type DisplayProperties = TreeDisplayProperties |
  PinataDisplayProperties |
  ScratchDisplayProperties |
  SpinDisplayProperties |
  QuizDisplayProperties;
/* eslint-enable @typescript-eslint/indent */

type CampaignConfig = {
  campaign_results: {count: number, first_result_id: number};
  referral_type: string;
  referral_codes: string[];
  referees_attained: number;
  referral_rewards?: IV4Reward[];
};

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
  campaign_referral_type?: string;
  campaign_config?: CampaignConfig;
}

type CountObject = {
  count: number;
};

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
    let campaignBannerUrl = oc(campaignBanner).url();
    if (campaignBannerUrl) {
      campaignBannerUrl = patchUrl(campaignBannerUrl);
    }
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
    let referralCodes;
    if (campaign.campaign_config && campaign.campaign_config.referral_codes) {
      referralCodes = [...campaign.campaign_config.referral_codes];
    }
    return {
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      type: campaign.campaign_type,
      state: campaign.state,
      endsAt: campaign.ends_at ? new Date(campaign.ends_at) : null,
      beginsAt: campaign.begins_at ? new Date(campaign.begins_at) : null,
      referralCodes,
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

  public getVoucherLeftCount(campaignId: number): Observable<{ count: number; campaignId: number }> {
    return this.http.get(`${this.baseUrl}/v4/campaigns/${campaignId}/voucher_count`).pipe(
      map((res: {data: CountObject}) => res.data),
      map((countObj: CountObject) => ({...countObj, campaignId}))
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
}
