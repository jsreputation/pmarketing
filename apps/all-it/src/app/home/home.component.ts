import { Component, OnInit } from '@angular/core';
import { HomeComponent as BCHomeComponent } from '@perxtech/blackcomb-pages';
import {
  AuthenticationService,
  ConfigService,
  FeedReaderService,
  ICampaignService,
  IConfig,
  IFlags,
  IGameService,
  ILoyalty,
  InstantOutcomeService,
  LoyaltyService,
  ProfileService,
  RewardsService,
  SettingsService,
  ThemesService,
} from '@perxtech/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { switchMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BCHomeComponent implements OnInit {
  public restrictedView: boolean = false;

  public constructor(
    rewardsService: RewardsService,
    gamesService: IGameService,
    router: Router,
    titleService: Title,
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
    datePipe: DatePipe,
    private loyaltyService: LoyaltyService
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
      datePipe
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
      const title =
        (theme.properties ? theme.properties['--title'] : undefined) ||
        'Blackcomb';
      this.titleService.setTitle(title);
    });

    this.configService
      .readAppConfig<void>()
      .pipe(
        map((config: IConfig<void>) => {
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

    this.authService.isAuthorized().subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.fetchPopupCampaigns();
      }
    });

    this.initCatalogsScan();
  }
}
