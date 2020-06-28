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
  ThemesService
} from '@perxtech/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {
  MatDialog
} from '@angular/material';
import { switchMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BCHomeComponent implements OnInit {
  public restrictedView: boolean = false;

  public constructor(
    public rewardsService: RewardsService,
    public gamesService: IGameService,
    public router: Router,
    public titleService: Title,
    public translate: TranslateService,
    public themesService: ThemesService,
    public configService: ConfigService,
    public authService: AuthenticationService,
    public campaignService: ICampaignService,
    public instantOutcomeService: InstantOutcomeService,
    public dialog: MatDialog,
    public feedService: FeedReaderService,
    public settingsService: SettingsService,
    public profileService: ProfileService,
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
      profileService
    );
  }

  public ngOnInit(): void {
    this.profileService.getCustomProperties()
      .pipe(
        switchMap(
          res => {
            if (res.referralCode) {
              return this.campaignService.applyReferral(res.referralCode as string);
            }
            return EMPTY;
          })
      ).subscribe();
    this.translate.get('HOME.HELLO').subscribe(
      (msg: string) => this.titleFn = (profile) => {
        let returnString = msg;
        if (profile &&
          profile.firstName && profile.firstName !== '' &&
          profile.lastName && profile.lastName !== '') {
          returnString = `${returnString}, ${profile.firstName} ${profile.lastName}`;
        } else if (profile && profile.firstName && profile.firstName !== '') {
          returnString = `${returnString}, ${profile.firstName}`;
        } else if (profile && profile.lastName && profile.lastName !== '') {
          returnString = `${returnString}, ${profile.lastName}`;
        }
        return returnString;
      }
    );
    this.rewards$ = this.rewardsService.getAllRewards(['featured']);
    this.getTabbedList();

    this.themesService.getThemeSetting().subscribe(
      theme => {
        this.theme = theme;
        const title = (theme.properties ? theme.properties['--title'] : undefined) || 'Blackcomb';
        this.titleService.setTitle(title);
      }
    );

    this.configService.readAppConfig<void>().subscribe(
      (config: IConfig<void>) => {
        this.appConfig = config;
        this.initCampaign();
      }
    );

    // if premium member hide stuff.
    this.loyaltyService.getLoyalties().pipe(
      map( (loyalties: ILoyalty[]) => loyalties[0]),
    ).subscribe(
      (loyalty: ILoyalty) => {
        if (loyalty) {
          this.restrictedView = loyalty.tiers.filter((tier) => tier.name === 'Premium').length > 0;
          console.log(this.restrictedView);
        }
      }
    );

    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.appRemoteFlags = flags;
      }
    );
    this.authService.isAuthorized().subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.fetchPopupCampaigns();
      }
    });


    this.initCatalogsScan();
  }
}
