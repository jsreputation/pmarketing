import { Component, OnInit } from '@angular/core';
import { HomeComponent as BCHomeComponent } from '@perxtech/blackcomb-pages';
import {
  AuthenticationService,
  ConfigService,
  FeedReaderService,
  ICampaignService,
  IConfig,
  IFlags,
  IGameService, IInstantOutcomeTransactionService,
  ILoyalty,
  InstantOutcomeService,
  IQuestService,
  IReward,
  LoyaltyService,
  ProfileService,
  RewardsService,
  SettingsService,
  TeamsService,
  ThemesService,
  TokenStorage,
  NotificationService,
} from '@perxtech/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, iif } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BCHomeComponent implements OnInit {
  public restrictedView: boolean = false;
  public favDisabled: boolean  = false;

  public constructor(
    rewardsService: RewardsService,
    gamesService: IGameService,
    router: Router,
    protected titleService: Title,
    translate: TranslateService,
    themesService: ThemesService,
    configService: ConfigService,
    authService: AuthenticationService,
    campaignService: ICampaignService,
    instantOutcomeService: InstantOutcomeService,
    dialog: MatDialog,
    feedService: FeedReaderService,
    settingsService: SettingsService,
    profileService: ProfileService,
    currencyPipe: CurrencyPipe,
    tokenService: TokenStorage,
    datePipe: DatePipe,

    private loyaltyService: LoyaltyService,
    questService: IQuestService,
    teamsService: TeamsService,
    instantOutcomeTransactionService: IInstantOutcomeTransactionService,
    notificationService: NotificationService,
  ) {
    super(
      rewardsService,
      gamesService,
      router,
      titleService,
      translate,
      themesService,
      configService,
      authService,
      campaignService,
      instantOutcomeService,
      dialog,
      feedService,
      settingsService,
      profileService,
      currencyPipe,
      tokenService,
      datePipe,
      questService,
      teamsService,
      instantOutcomeTransactionService,
      notificationService,
    );
  }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalty().subscribe((loyalty) => {
      if (loyalty && !loyalty.membershipState) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
    this.profileService
      .getCustomProperties()
      .pipe(
        switchMap((res) => {
          if (res.referralCode) {
            return this.campaignService.applyReferral(
              res.referralCode as string
            );
          }
          return EMPTY;
        })
      )
      .subscribe();

    this.rewards$ = this.rewardsService.getAllRewards(['featured']);
    this.getTabbedList();

    this.themesService.getThemeSetting().subscribe((theme) => {
      this.theme = theme;
    });

    this.configService
      .readAppConfig<void>()
      .pipe(
        tap((config: IConfig<void>) => {
          this.authService.isAuthorized().subscribe((isAuth: boolean) => {
            if (isAuth && !this.configService.readAppStarted()) {
              this.configService.setAppStarted();
              if (config.showPopupCampaign) {
                this.fetchPopupCampaigns();
              }
            }
          });
          this.appConfig = config;
          this.initCampaign();
        }),
        switchMap(() => this.settingsService.getRemoteFlagsSettings())
      )
      .subscribe((flags: IFlags) => {
        // todo: create a function to wrap all the rest of the init calls
        this.appRemoteFlags = flags;
      });

    // if premium member hide stuff.
    this.loyaltyService
      .getLoyalties()
      .pipe(map((loyalties: ILoyalty[]) => loyalties[0]))
      .subscribe((loyalty: ILoyalty) => {
        if (loyalty) {
          this.restrictedView =
            loyalty.tiers.filter((tier) => tier.name === 'Premium').length > 0;
        }
      });

    this.initCatalogsScan();
  }

  public rewardFavoriteHandler(rewardToggled: IReward): void {
    if (this.favDisabled) {
      return;
    }

    this.favDisabled = true;

    iif(() => (rewardToggled && (rewardToggled.favorite || false)),
    this.rewardsService.unfavoriteReward(rewardToggled.id),
    this.rewardsService.favoriteReward(rewardToggled.id)).pipe(
      tap(
        rewardChanged => {
          this.rewards$ = this.rewards$.pipe(
            map(rewards => {
              const foundIndex = rewards.findIndex(reward => reward.id === rewardToggled.id);
              rewards[foundIndex] = rewardChanged;
              return rewards;
            })
          );
        }
      ),
      finalize(() => setTimeout(() => {
        this.favDisabled = false;
      }, 500))
    ).subscribe();
  }
}
