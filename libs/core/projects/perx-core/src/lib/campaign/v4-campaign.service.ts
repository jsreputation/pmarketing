import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  CampaignDisplayProperties,
  CampaignOutcomeType,
  CampaignState,
  CampaignType,
  IBadgeOutcome,
  IBDOCampaignEnrolment,
  ICampaign,
  ICampaignOutcome,
  ICampaignRule,
  IPointsOutcome,
  IReferral,
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
  TreeDisplayProperties,
} from '../game/v4-game.service';
import { QuizDisplayProperties } from '../quiz/v4-quiz.service';
import { GameType } from '../game/game.model';
import { patchUrl } from '../utils/patch-url.function';
import { Cacheable } from 'ngx-cacheable';
import { QuestDisplayProperties } from '../quest/v4-quest.service';
import { StampCampaignDisplayProperties } from '../stamp/v4-stamp.service';
import { IV4ProgressDisplayProperties } from '../progress-campaign/v4-progress-campaign.service';
import { IV4TeamsDisplayProperties } from '../teams/v4-teams.service';
import { IV4InstantRewardCampaignDisplayProperties } from '../instant-outcome-transaction/v4-instant-outcome-transaction.service';
import { ITag } from '../merchants/models/merchants.model';

interface IV4Image {
  type: string;
  url: string;
}

export interface IV4OperatingHours {
  id: number;
  closes_at: string;
  opens_at: string;
  days: number[]; // expects 0 - 6, Sunday - Saturday
  formatted_offset: string;
}

/* eslint-disable @typescript-eslint/indent */
type DisplayProperties =
  | TreeDisplayProperties
  | PinataDisplayProperties
  | ScratchDisplayProperties
  | SpinDisplayProperties
  | QuizDisplayProperties
  | QuestDisplayProperties
  | IV4ProgressDisplayProperties
  | IV4TeamsDisplayProperties
  | StampCampaignDisplayProperties
  | IV4InstantRewardCampaignDisplayProperties;
/* eslint-enable @typescript-eslint/indent */

type CampaignConfig = {
  campaign_results: { count: number; first_result_id: number };
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
  tags: ITag[];
  state: CampaignState;
  rewards?: IV4Reward[];
  display_properties?: DisplayProperties | null;
  campaign_referral_type?: string;
  campaign_config?: CampaignConfig;
  referral_code: string;
  terms_and_conditions?: string;
  operating_hour?: IV4OperatingHours;
  operating_now?: boolean;
  team_size?: number; // used for stamp team campaigns
  score?: number;
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
export interface IV4CampaignRuleResponse {
  data: IV4CampaignRule[];
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
  campaign_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  // ordering: any|null;
  referee_required_for_reward: number;
  total_reward_limit: number;
  total_user_limit: number;
  award_to_referral: boolean;
  award_to_referee: boolean;
  total_referree_limit: number;
  stamp_number: number;
  // total_referree_reward_limit: any|null;
  // hidden: any|null;
}

export interface IV4CampaignOutcomeItem {
  id: number;
  name: string;
  type: CampaignOutcomeType;
}
export interface IV4CampaignRule {
  id: number,
  name: string,
  state: string,
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

export interface IV4AdditionalSection {
  header_text: String,
  body_text: String,
}

interface IV4RuleGroupCampaignDisplayProperties {
  landing_page?: {
    body_text?: string;
    description?: string;
    headline?: string;
    image?: { type?: string; value?: { filename?: string; image_url?: string } };
    sub_headline?: string;
    additional_sections?: IV4AdditionalSection[];
  };
  enrolment_page?: {
    body_text?: string;
  };
}

interface IV4GetSearchCampaignsResponse {
  data: {
    campaigns: {
      campaign: IV4Campaign,
      score: number
    }[]
  }
}

interface IV4BdoEnrolmentResponse {
  data: IV4BdoEnrolment;
}

interface IV4BdoEnrolment {
  id: number;
  campaign_id: number;
  campaign_name: string;
  enrolled_at: Date;
  enrolment_reference: string;
  user_account_id: number;
}

const campaignsCacheBuster: Subject<boolean> = new Subject();

@Injectable({ providedIn: 'root' })
export class V4CampaignService implements ICampaignService {
  public campaignsCache: Observable<ICampaign>[] = [];
  public baseUrl: string;
  private lang: string = 'en';

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService
      .readAppConfig()
      .subscribe(
        (config: IConfig<any>) => (this.baseUrl = config.apiHost as string)
      );
  }

  public static v4CampaignToCampaign(
    campaign: IV4Campaign,
    lang: string = 'en'
  ): ICampaign {
    const customFields = campaign.custom_fields;
    const thumbnail = campaign.images.find((image) =>
      ['catalog_thumbnail', 'campaign_thumbnail'].some(
        (ty) => ty === image.type
      )
    );
    const thumbnailUrl = oc(thumbnail).url();
    const campaignBanner = campaign.images.find((i) =>
      ['campaign_banner', 'header'].some((ty) => ty === i.type)
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

    if (dp && (dp as StampCampaignDisplayProperties).landing_page) {
      const lp = (dp as StampCampaignDisplayProperties).landing_page;
      if (lp) {
        displayProperties = {
          landingPage: {
            body: {
              text: lp.body ? lp.body[lang].text : '',
            },
            buttonText: {
              text: lp.button_text ? lp.button_text[lang].text : '',
            },
            buttonText2: {
              text: lp.button_text2 ? lp.button_text2[lang].text : '',
            },
            tnc: {
              text: lp.tnc ? lp.tnc[lang].text : '',
            },
            subHeadline:lp.sub_headline?lp.sub_headline:'',
            additionalSections: lp?.additional_sections?.map(item => {
              return {
                headerText: item.header_text,
                bodyText: item.body_text
              }

            })
          },
        };
        let youtubeUrl = oc(lp).media.youtube() || null;
        if (youtubeUrl) {
          youtubeUrl = youtubeUrl.replace('/watch?v=', '/embed/');

          // @ts-ignore
          displayProperties.landingPage.media = { ...displayProperties.landingPage.media, youtube: youtubeUrl, };
        }
        if (lp.media?.banner_image) {
          // @ts-ignore
          displayProperties.landingPage.media = { ...displayProperties.landingPage.media, bannerImage: lp.media.banner_image.value.image_url }
        }
      }
    }
    if (dp && (dp as GameProperties).background_image) {
      if (displayProperties === undefined) {
        displayProperties = {
          landingPage: {},
        };
      }
      // @ts-ignore
      displayProperties.landingPage.backgroundUrl = patchUrl(
        oc(dp as GameProperties).background_image.value.image_url('')
      );
    }

    if (dp && (dp as QuestDisplayProperties).quest_success_image) {
      const qp = dp as QuestDisplayProperties;
      if (displayProperties === undefined) {
        displayProperties = {
          questDetails: {},
        };
      }
      if (qp.header) {
        displayProperties.questDetails = {
          title: qp.header.value.title,
          description: qp.header.value.description,
        };
      }
      if (qp.body) {
        // @ts-ignore
        displayProperties.questDetails.body = qp.body;
      }
      if (qp.image) {
        // @ts-ignore
        displayProperties.questDetails.imageUrl =
          qp.image.value.image_url || qp.image.value.file;
      }
      if (qp.quest_success_image) {
        // @ts-ignore
        displayProperties.questDetails.successImageUrl =
          qp.quest_success_image.value.image_url ||
          qp.quest_success_image.value.file;
      }
    }

    if (dp && (dp as IV4ProgressDisplayProperties).milestones_success_image) {
      const v4ProgressProps = dp as IV4ProgressDisplayProperties;
      if (displayProperties === undefined) {
        displayProperties = {
          progressDetails: {},
        };
      }
      if (v4ProgressProps.header) {
        displayProperties.progressDetails = {
          intro: {
            title: v4ProgressProps.header.value.title,
            description: v4ProgressProps.header.value.description,
          },
          levelTab: {
            title: v4ProgressProps.header.level_tab.value.title,
            pointsAbbreviation:
              v4ProgressProps.header.level_tab.value.points_abbreviation,
          },
          howToTab: {
            title: v4ProgressProps.header.how_to_participate_tab.value.title,
            description:
              v4ProgressProps.header.how_to_participate_tab.value.description,
          },
        };
      }

      if (v4ProgressProps.body) {
        // @ts-ignore
        displayProperties.progressDetails.body = v4ProgressProps.body;
      }

      if (v4ProgressProps.image) {
        // @ts-ignore
        displayProperties.progressDetails.imageUrl =
          v4ProgressProps.image.value.image_url ||
          v4ProgressProps.image.value.file;
      }

      if (v4ProgressProps.milestones_success_image) {
        // @ts-ignore
        displayProperties.progressDetails.successImageUrl =
          v4ProgressProps.milestones_success_image.icon.value.image_url ||
          v4ProgressProps.milestones_success_image.icon.value.file;
      }
    }

    if (dp && (dp as IV4TeamsDisplayProperties).teams) {
      const v4TeamsProps = (dp as IV4TeamsDisplayProperties).teams;

      if (displayProperties === undefined) {
        displayProperties = {
          teamsDetails: {},
          landingPage: {},
        };
      }
      if (v4TeamsProps?.landing_page) {
        displayProperties.teamsDetails!.landingPage = {
          preEnrolmentMessage: v4TeamsProps.landing_page.pre_enrolment_message,
          stampsEarnMessage: v4TeamsProps.landing_page.stamps_earn_message,
          teamComplete: {
            buttonText: v4TeamsProps.landing_page.team_complete?.button_text,
            buttonTextSecondary:
              v4TeamsProps.landing_page.team_complete?.button_text_secondary,
          },
          teamIncomplete: {
            buttonText: v4TeamsProps.landing_page.team_incomplete?.button_text,
            buttonTextSecondary:
              v4TeamsProps.landing_page.team_incomplete?.button_text_secondary,
          },
          image: v4TeamsProps.landing_page.image?.value.image_url,
        };

        displayProperties.landingPage! = {
          subHeading: {
            text: v4TeamsProps.landing_page.pre_enrolment_message,
          },
          media: {
            bannerImage: v4TeamsProps.landing_page.image?.value.image_url,
          },
        };
      }

      if (v4TeamsProps?.join_page) {
        displayProperties.teamsDetails!.joinPage = {
          description: v4TeamsProps.join_page.description,
        };
      }
      if (v4TeamsProps?.invite_message) {
        displayProperties.teamsDetails!.inviteMessage = {
          description: v4TeamsProps.invite_message.description,
          codeBlurb: v4TeamsProps.invite_message.code_blurb,
        };
      }
    }

    if (campaign.campaign_type === CampaignType.instant) {
      const lp = (dp as IV4InstantRewardCampaignDisplayProperties)?.landing_page;
      const cp = (dp as IV4InstantRewardCampaignDisplayProperties)?.claim_prize;
      if (lp) {
        displayProperties = {
          landingPage: {
            body: {
              text: lp.body_text ? lp.body_text : '',
            },
            heading: {
              text: lp.headline ? lp.headline : '',
            },
            description: {
              text: lp.description ? lp.description : '',
            },
            subHeading: {
              text: lp.sub_headline ? lp.sub_headline : '',
            },
            media: {
              bannerImage:
                lp.image?.type === 'image' ? lp.image?.value?.image_url : '',
            }
          },
        };
      }
      if (cp) {
        displayProperties = displayProperties ? displayProperties : {};
        displayProperties = {
          ...displayProperties,
          claimPrize: {
            buttonText: cp.button_text || '',
            headline: cp.headline || '',
            image: cp.image
              ? {
                value: {
                  filename: cp.image.value.filename,
                  imageUrl: cp.image.value.image_url,
                },
              }
              : undefined,
            subHeadline: cp.sub_headline || '',
          },
        };
      }
    }

    if (campaign.campaign_type === CampaignType.rulegroup) {
      const landingPage = (dp as IV4RuleGroupCampaignDisplayProperties)?.landing_page;
      const enrolmentPage = (dp as IV4RuleGroupCampaignDisplayProperties)?.enrolment_page;
      if (landingPage) {
        displayProperties = {
          landingPage: {
            body: {
              text: landingPage.body_text ? landingPage.body_text : '',
            },
            heading: {
              text: landingPage.headline ? landingPage.headline : '',
            },
            description: {
              text: landingPage.description ? landingPage.description : '',
            },
            subHeading: {
              text: landingPage.sub_headline ? landingPage.sub_headline : '',
            },
            media: {
              bannerImage:
                landingPage.image?.type === 'image' ? landingPage.image?.value?.image_url : '',
            },
            additionalSections: landingPage?.additional_sections?.map(item => {
              return {
                headerText: item.header_text,
                bodyText: item.body_text
              };
            })
          },
        };
      }

      if (enrolmentPage) {
        displayProperties = displayProperties ? displayProperties : {};
        displayProperties = {
          ...displayProperties,
          enrolmentPage: {
            body: enrolmentPage.body_text
          }
        }
      }
    }
    let referralCodes, refersAttained;
    referralCodes = [campaign.referral_code];
    if (campaign.campaign_config) {
      if (campaign.campaign_config.referral_codes) {
        referralCodes = [
          ...referralCodes,
          ...campaign.campaign_config.referral_codes,
        ];
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
        days: campaign.operating_hour.days,
        formattedOffset: campaign.operating_hour.formatted_offset,
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
      teamSize: campaign.team_size,
      displayProperties,
      customFields,
      categoryTags: campaign.category_tags,
      tags: campaign.tags,
      score: campaign?.score
    };
  }

  @Cacheable({
    cacheBusterObserver: campaignsCacheBuster,
    maxCacheCount: 50,
    maxAge: 300000, // 5 minutes
  })
  public getCampaigns(
    filterOptions?: ICampaignFilterOptions
  ): Observable<ICampaign[]> {
    let params = new HttpParams();
    if (filterOptions) {
      Object.keys(filterOptions).forEach((key) => {
        if (filterOptions.hasOwnProperty(key)) {
          if (key === 'type') {
            params = params.set('campaign_type', filterOptions[key] || '');
          } else if (key === 'gameType') {
            if (filterOptions.gameType !== GameType.unknown) {
              params = params.set('game_type', filterOptions.gameType || '');
            }
          } else if (key === 'categoryIds') {
            if (filterOptions.categoryIds) {
              params = params.set('category_ids', filterOptions.categoryIds.join('|') || '');
            }
          } else if (key === 'sortBy') {
            params = params.set('sort_by', filterOptions.sortBy || '');
          }  else if (key === 'tags') {
            if (filterOptions.tags) {
              params = params.set('tags', filterOptions.tags.join('|') || '');
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
        map((resp) => resp.data),
        map((campaigns: IV4Campaign[]) =>
          campaigns.map((campaign) =>
            V4CampaignService.v4CampaignToCampaign(campaign, this.lang)
          )
        )
      );
  }
  public getCampaignsRules(campaignId: number): Observable<ICampaignRule[]> {
    return this.http
      .get<IV4CampaignRuleResponse>(`${this.baseUrl}/v4/campaigns/${campaignId}/rules`,)
      .pipe(
        map((resp) => resp.data),
        map((campaigns: ICampaignRule[]) =>
          campaigns.map((campaign) =>
            V4CampaignService.v4CampaignRuleToCampaignRule(campaign)
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
    maxAge: 300000,
  })
  public getCampaign(id: number): Observable<ICampaign> {
    if (this.campaignsCache[id]) {
      return this.campaignsCache[id];
    }
    return (this.campaignsCache[id] = this.http
      .get<IV4CampaignResponse>(`${this.baseUrl}/v4/campaigns/${id}`)
      .pipe(
        map((res) =>res.data),
        map((campaign: IV4Campaign) =>
          V4CampaignService.v4CampaignToCampaign(campaign, this.lang)
        ),
        catchError((_) => {
          delete this.campaignsCache[id];
          return EMPTY;
        })
      ));
  }

  @Cacheable({
    cacheBusterObserver: campaignsCacheBuster,
    maxCacheCount: 50,
    maxAge: 300000,
  })
  public getCampaignsById(
    ids: number[],
    pageSize?: number,
    locale: string = 'en'): Observable<ICampaign[]> {
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept-Language', locale);
      const campaignIds = ids.join('|');
      let params = new HttpParams();
      if (pageSize) {
        params = params.set('size', pageSize.toString());
      }
      return this.http
        .get<IV4CampaignsResponse>(`${this.baseUrl}/v4/campaigns/?ids=${campaignIds}`, {
          headers,
          params
        })
        .pipe(
          map((res) => res.data),
          map((campaigns: IV4Campaign[]) =>
          campaigns.map((campaign) =>
            V4CampaignService.v4CampaignToCampaign(campaign, this.lang)
          )
        ),
      );
  }

  public getVoucherLeftCount(
    campaignId: number
  ): Observable<{ count: number; campaignId: number }> {
    return this.http
      .get(`${this.baseUrl}/v4/campaigns/${campaignId}/voucher_count`)
      .pipe(
        map((res: { data: CountObject }) => res.data),
        map((countObj: CountObject) => ({ ...countObj, campaignId }))
      );
  }

  // api 404 and WIP response. type any for the moment
  public applyReferral(referralCode: string): Observable<IReferral> {
    const referralBody = {
      referral_code: referralCode,
    };
    return this.http
      .post(`${this.baseUrl}/v4/campaigns/referral`, referralBody)
      .pipe(catchError((e) => of(e)));
  }

  public getCampaignOutcomes(id: number): Observable<ICampaignOutcome[]> {
    return this.http
      .get<IV4CampaignOutcomeResponse>(
        `${this.baseUrl}/v4/campaigns/${id}/outcomes`
      )
      .pipe(
        map((resp) => resp.data),
        map((campaignOutcomes: IV4CampaignOutcome[]) =>
          campaignOutcomes.filter(
            (o) =>
              o.modularizable_type === CampaignOutcomeType.reward ||
              o.modularizable_type === CampaignOutcomeType.badge ||
              o.modularizable_type === CampaignOutcomeType.points ||
              o.modularizable_type === CampaignOutcomeType.prizeSet
          )
        ),
        map((campaignOutcomes: IV4CampaignOutcome[]) =>
          campaignOutcomes.map((campaignOutcome) =>
            V4CampaignService.v4CampaignOutcomeToCampaignOutcome(
              campaignOutcome
            )
          )
        ),
        catchError((e) => of(e))
      );
  }

  public enrolIntoCampaign(campaignId: number): Observable<boolean> {
    return this.http
      .post(`${this.baseUrl}/v4/campaigns/${campaignId}/enrol`, null, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) =>
          response.status === 200 ? true : false
        ),
        catchError((error: HttpErrorResponse) =>
          error.status === 404 ? of(false) : throwError(error)
        )
      );
  }

  public bdoCampaignEnrol(id: number, promoID: string, captchaToken: string): Observable<IBDOCampaignEnrolment> {
    return this.http
      .post<IV4BdoEnrolmentResponse>(`${this.baseUrl}/v4/custom/bdo/campaigns/${id}/enrolment`,
        {
          promo_id: promoID,
          recaptcha_token: captchaToken
        }).pipe(
        map((response: IV4BdoEnrolmentResponse) => response.data),
        map((enrolment: IV4BdoEnrolment) => {
          return {
            id: enrolment.id,
            campaignId: enrolment.campaign_id,
            campaignName: enrolment.campaign_name,
            enrolledAt: enrolment.enrolled_at,
            enrolmentReference: enrolment.enrolment_reference,
            userAccountId: enrolment.user_account_id,
          };
        }),
        catchError((error: HttpErrorResponse) =>
          throwError(error)
        )
      );
  }

  public searchCampaigns(text: string, page?: number, pageSize?: number, locale = 'en'): Observable<ICampaign[]> {
    const endpoint = `${this.baseUrl}/v4/campaigns/search?search_string=${text}`;
    const headers = new HttpHeaders().set('Accept-Language', locale);
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (pageSize) {
      params = params.set('size', pageSize.toString());
    }
    return this.http
      .get<IV4GetSearchCampaignsResponse>(endpoint, { headers, params })
      .pipe(
        map((res: IV4GetSearchCampaignsResponse) =>
          res.data.campaigns.map((item) => {
            return { ...item.campaign, score: item.score };
          })
        ),
        map((campaign: IV4Campaign[]) =>
          campaign.map((campaign: IV4Campaign) =>
            V4CampaignService.v4CampaignToCampaign(campaign)
          )
        )
      );
  }

  public static v4CampaignRuleToCampaignRule(
    campaignRule: IV4CampaignRule
  ): ICampaignRule {
    return {
      id: campaignRule.id,
      state: campaignRule.state,
      name: campaignRule.name
    }
  }

  public static v4CampaignOutcomeToCampaignOutcome(
    campaignOutcome: IV4CampaignOutcome
  ): ICampaignOutcome {
    return {
      id: campaignOutcome.modularizable_id,
      type: campaignOutcome.modularizable_type,
      name: campaignOutcome.outcome ? campaignOutcome.outcome.name : '',
      pointsCount: campaignOutcome.points_count,
      campaignId: campaignOutcome.campaign_id,
      createdAt: campaignOutcome.created_at,
      updatedAt: campaignOutcome.updated_at,
      refereeRequiredForReward: campaignOutcome.referee_required_for_reward,
      totalRewardLimit: campaignOutcome.total_reward_limit,
      totalUserLimit: campaignOutcome.total_user_limit,
      awardToTeferral: campaignOutcome.award_to_referral,
      awardToReferee: campaignOutcome.award_to_referee,
      totalReferreeLimit: campaignOutcome.total_referree_limit,
      stampNumber: campaignOutcome.stamp_number,
    };
  }

  public static v4PointsToPoints(points: IV4PointsOutcome): IPointsOutcome {
    return {
      id: points.id,
      outcomeType: points.outcome_type,
      points: points.points,
      properties: points.properties,
    };
  }

  public static v4BadgeToBadge(badge: IV4BadgeOutcome): IBadgeOutcome {
    return {
      id: badge.id,
      outcomeType: badge.outcome_type,
      badgeId: badge.badge_id,
      state: badge.state,
    };
  }
}
