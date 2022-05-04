import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';

import { iif, Observable, of, throwError, } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';

import { IWSetting } from '@perxtech/whistler';

import { IConfig } from '../config/models/config.model';

import { AuthenticationService } from '../auth/authentication/authentication.service';
import { ICustomProperties } from '../profile/profile.model';
import { SettingsService } from './settings.service';
import {
  GatekeeperApis,
  IFlags,
  IMicrositeSettings,
  IRssFeeds,
  PagesObject,
  VoucherDistributionTypes
} from './models/settings.model';
import { ConfigService } from '../config/config.service';
import { oc } from 'ts-optchain';

interface IV4FlagsResponse {
  data: IV4Flags;
}

interface IV4WordPressRssResponse {
  data: IV4WordPressRss;
}

interface IV4Flags {
  id: number;
  key: string;
  string_value: string;
  json_value: {
    merchant_map: boolean;
    rewards_carousel: boolean;
    rebate_demo_flow: boolean;
    gatekeeper_polling_interval: number;
    show_stamp_campaigns: boolean;
    gatekeeper_api: GatekeeperApis;
    show_loyalty_on_home: boolean;
    gatekeeper_url: string;
    show_rssfeed_cta: boolean;
    show_nearme: boolean;
    show_progress_campaigns_nav_button: boolean;
    show_voucher_status_labels: boolean;
    voucher_distribution_type: VoucherDistributionTypes;
    system_sets_password: boolean;
    show_reward_favourite_button: boolean;
    show_leaderboard: boolean;
    show_quest: boolean;
    show_happy_hour_operating_hours: boolean;
    show_personalise_rewards: boolean;
    show_point_transfer: boolean;
    show_accounts_page?: boolean;
    show_campaign_landing_page?: boolean;
    show_campaign_rewards_counter_on_homepage?: boolean;
    show_catalog_on_home_page?: boolean;
    show_expiry_on_reward_detail?: boolean;
    show_extra_loyalty_on_home_page?: boolean;
    show_forget_password_on_login?: boolean;
    show_game_tries_on_campaign_card?: boolean;
    show_history_page?: boolean;
    show_home_page?: boolean;
    show_leaderboard_link_on_home_page?: boolean;
    show_logo?: boolean;
    show_loyalty_progress?: boolean;
    show_macaron_on_reward_details?: boolean;
    show_password_toggle_on_sign_up_page?: boolean;
    show_popup_campaign?: boolean;
    show_prize_set_outcome?: boolean;
    show_progress_bar_campaigns_on_home_page?: boolean;
    show_instant_reward_campaigns_on_home_page?: boolean;
    show_qr_page_subtitle?: boolean;
    show_quest_campaigns_on_home_page?: boolean;
    show_quiz_on_home_page?: boolean;
    show_referral_campaigns_on_home_page?: boolean;
    show_referral_details?: boolean;
    show_reward_nav_button?: boolean;
    show_rewards_on_homepage?: boolean;
    show_stamp_campaigns_on_home_page?: boolean;
    show_stamp_teams?: boolean;
    show_subtitle_login?: boolean;
    show_survey_on_home_page?: boolean;
    show_transaction_history_on_accounts_page?: boolean;
    show_user_info_on_accounts_page?: boolean;
    show_user_qr?: boolean;
    show_voucher_booking_from_rewards_page?: boolean;
    show_badges_button: boolean;
    show_outcomes_on_campaign_landing_page?: boolean;
    disable_post_game_nav?: boolean;
    chromeless?: boolean;
    show_additional_details_on_voucher_QR?: boolean;
    append_reward_name?: boolean;
  };
}

interface IV4WordPressRss {
  id: number;
  key: string;
  string_value: string;
  json_value: {
    blog_section: {
      url: string;
      section: string;
    }[]
  };
}

interface IV4MicrositeSettingsResponse {
  data: IV4MicrositeSettings;
}

interface IV4MicrositeSettings {
  id: number;
  key: string;
  string_value: string;
  json_value: ICustomProperties;
}
interface IV4GatekeeperResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class V4SettingsService extends SettingsService {
  private settings: any;
  private hostName: string;
  private rssFeeds: IRssFeeds;
  private flags: IFlags;

  private httpBackend: HttpClient;
  constructor(
    private http: HttpClient,
    externalBackend: HttpBackend,
    private configService: ConfigService,
    private authenticationService: AuthenticationService
  ) {
    super();
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.hostName = config.apiHost as string;
        this.httpBackend = new HttpClient(externalBackend);
      });
  }

  public static v4MicrositeSettingsToMicrositeSettings(v4Settings: IV4MicrositeSettings): IMicrositeSettings {
    return {
      id: v4Settings.id,
      key: v4Settings.key,
      stringValue: v4Settings.string_value,
      jsonValue: v4Settings.json_value,
    };
  }

  public static v4FlagsToFlags(data: IV4Flags): IFlags {
    return {
      merchantMap: data.json_value.merchant_map,
      rewardsCarousel: data.json_value.rewards_carousel,
      rebateDemoFlow: data.json_value.rebate_demo_flow,
      gatekeeperPollingInterval: data.json_value.gatekeeper_polling_interval,
      showStampCampaigns: data.json_value.show_stamp_campaigns,
      gatekeeperApi: data.json_value.gatekeeper_api,
      showLoyaltyBlockOnHomePage: data.json_value.show_loyalty_on_home,
      gatekeeperUrl: data.json_value.gatekeeper_url,
      showRSSfeedCTA: data.json_value.show_rssfeed_cta,
      showNearMePage: data.json_value.show_nearme,
      showProgressCampaignsNavButton: data.json_value.show_progress_campaigns_nav_button,
      showRewardFavButton: data.json_value.show_reward_favourite_button,
      showVoucherStatusLabels: data.json_value.show_voucher_status_labels,
      voucherDistributionType: data.json_value.voucher_distribution_type,
      systemSetsPassword: data.json_value.system_sets_password,
      showLeaderboard: data.json_value.show_leaderboard,
      showQuest: data.json_value.show_quest,
      showHappyHourOperatingHours: data.json_value.show_happy_hour_operating_hours,
      showPersonaliseRewards: data.json_value.show_personalise_rewards,
      showAccountsPage: data.json_value.show_accounts_page,
      showCampaignLandingPage: data.json_value.show_campaign_landing_page,
      showCampaignRewardsCounterOnHomepage: data.json_value.show_campaign_rewards_counter_on_homepage,
      showCatalogOnHomePage: data.json_value.show_catalog_on_home_page,
      showExpiryOnRewardDetail: data.json_value.show_expiry_on_reward_detail,
      showExtraLoyaltyOnHomePage: data.json_value.show_extra_loyalty_on_home_page,
      showForgetPasswordOnLogin: data.json_value.show_forget_password_on_login,
      showGameTriesOnCampaignCard: data.json_value.show_game_tries_on_campaign_card,
      showHistoryPage: data.json_value.show_history_page,
      showHomePage: data.json_value.show_home_page,
      showLeaderboardLinkOnHomePage: data.json_value.show_leaderboard_link_on_home_page,
      showLogo: data.json_value.show_logo,
      showLoyaltyProgress: data.json_value.show_loyalty_progress,
      showMacaronOnRewardDetails: data.json_value.show_macaron_on_reward_details,
      showPasswordToggleOnSignUpPage: data.json_value.show_password_toggle_on_sign_up_page,
      showPopupCampaign: data.json_value.show_popup_campaign,
      showPrizeSetOutcome: data.json_value.show_prize_set_outcome,
      showProgressBarCampaignsOnHomePage: data.json_value.show_progress_bar_campaigns_on_home_page,
      showInstantRewardCampaignsOnHomePage: data.json_value.show_instant_reward_campaigns_on_home_page,
      showQrPageSubtitle: data.json_value.show_qr_page_subtitle,
      showQuestCampaignsOnHomePage: data.json_value.show_quest_campaigns_on_home_page,
      showQuizOnHomePage: data.json_value.show_quiz_on_home_page,
      showReferralCampaignsOnHomePage: data.json_value.show_referral_campaigns_on_home_page,
      showReferralDetails: data.json_value.show_referral_details,
      showRewardNavButton: data.json_value.show_reward_nav_button,
      showRewardsOnHomepage: data.json_value.show_rewards_on_homepage,
      showStampCampaignsOnHomePage: data.json_value.show_stamp_campaigns_on_home_page,
      showStampTeams: data.json_value.show_stamp_teams,
      showSubtitleLogin: data.json_value.show_subtitle_login,
      showSurveyOnHomePage: data.json_value.show_survey_on_home_page,
      showTransactionHistoryOnAccountsPage: data.json_value.show_transaction_history_on_accounts_page,
      showUserInfoOnAccountsPage: data.json_value.show_user_info_on_accounts_page,
      showUserQR: data.json_value.show_user_qr,
      showVoucherBookingFromRewardsPage: data.json_value.show_voucher_booking_from_rewards_page,
      showPointTransfer: data.json_value.show_point_transfer,
      showBadgesButton: data.json_value.show_badges_button,
      showOutcomesOnCampaignLandingPage: data.json_value.show_outcomes_on_campaign_landing_page,
      disablePostGameNav: data.json_value.disable_post_game_nav,
      chromeless: data.json_value.chromeless,
      showAdditionalDetailsOnVoucherQR: data.json_value.show_additional_details_on_voucher_QR,
      appendRewardName: data.json_value.append_reward_name
    };
  }

  public static v4WordPressRssToRss(data: IV4WordPressRss): IRssFeeds {
    const newIRssFeeds: IRssFeeds = { data: [] };
    if (oc(data).json_value.blog_section()) {
      data.json_value.blog_section.forEach(rssSection => {
        newIRssFeeds.data.push({
          url: rssSection.url,
          page: rssSection.section
        });
      });
    }
    return newIRssFeeds;
  }

  public readRssFeeds(): Observable<IRssFeeds> {
    return this.http.get<IRssFeeds>('assets/config/RSS_FEEDS.json');
  }

  public getRssFeeds(): Observable<IRssFeeds> {
    if (this.rssFeeds) {
      return of(this.rssFeeds);
    }
    return this.http.get<IV4WordPressRssResponse>(`${this.hostName}/v4/settings/wordpress`).pipe(
      map((res: IV4WordPressRssResponse) => res.data),
      map((data: IV4WordPressRss) => V4SettingsService.v4WordPressRssToRss(data)),
      tap((data: IRssFeeds) => this.rssFeeds = data)
    );
  }

  public getRemoteFlagsSettings(): Observable<IFlags> {
    if (this.flags) {
      return of(this.flags);
    }
    return this.http.get<IV4FlagsResponse>(`${this.hostName}/v4/settings/microsite_feature_flags`).pipe(
      map((res: IV4FlagsResponse) => res.data),
      map((data: IV4Flags) => V4SettingsService.v4FlagsToFlags(data)),
      tap((data: IFlags) => this.flags = data),
      catchError(err => throwError(err))
    );
  }

  public getTenantAppSettings(key: string): Observable<IMicrositeSettings> {

    if (this.settings) {
      return of(this.settings);
    }

    return this.authenticationService.getAppToken().pipe(
      switchMap(() => this.http.get(`${this.hostName}/v4/settings/${key}`)),
      map((res: IV4MicrositeSettingsResponse) => res.data),
      map((data: IV4MicrositeSettings) => V4SettingsService.v4MicrositeSettingsToMicrositeSettings(data)),
      share()
    );
  }

  public getAccountSettings<T>(): Observable<PagesObject> {
    return this.configService.readAppConfig<T>().pipe(
      map(res => res.displayProperties),
      map((displayProps: IWSetting) => displayProps && displayProps.account ? displayProps.account : { pages: [] }),
      map((account) => this.settings = account)
    );
  }

  public isGatekeeperOpen(): Observable<boolean> {
    let gateKeeperURL = '';
    // this will return a empty body and angular does not like it.
    const perxGatekeeper = this.http.get<IV4GatekeeperResponse>(`${this.hostName}/v4/gatekeep_token`);
    // currently only implemented for prod todo: auth and staging/prod versions
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.getRemoteFlagsSettings().pipe(
      switchMap((flags: IFlags) => {
        if (!flags.gatekeeperUrl) {
          return throwError('Gate keeper URL is empty');
        }
        gateKeeperURL = flags.gatekeeperUrl;
        return of(flags);
      }),
      switchMap((flags: IFlags) =>
        iif(() => flags.gatekeeperApi === GatekeeperApis.AWS,
          this.httpBackend.get<IV4GatekeeperResponse>(gateKeeperURL, { headers }),
          perxGatekeeper
        )
      ),
      map((res: IV4GatekeeperResponse) => {
        if (res.message === 'go ahead') {
          return true;
        }
        // false signals that the app should continue holding.
        return false;
      }),
      // expecting a HTTP 429 error to be handled by caller
    );
  }
}
