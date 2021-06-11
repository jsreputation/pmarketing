import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { take, tap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import {
  ProfileService,
  IProfile,
  ConfigService,
  IConfig,
  AuthenticationService,
  Config,
  PagesObject,
  AccountPageObject,
  ITheme,
  ThemesService,
  LoyaltyService,
  ILoyalty,
  SettingsService,
  IFlags,
} from '@perxtech/core';
import { V4BadgeService } from 'libs/core/projects/perx-core/src/lib/badges/v4-badge.service';

@Component({
  selector: 'perx-blackcomb-pages-account',
  templateUrl: './account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public profile$: Observable<IProfile> | null = null;
  public loyalty$: Observable<ILoyalty>;
  public pages!: AccountPageObject[];
  public preAuth: boolean = false;
  public theme: Observable<ITheme>;
  public appConfig$: Observable<IConfig<void>>;
  public memberFn: (membershipTierName: string) => Observable<string>;
  public remoteFlags: IFlags;
  public acquiredBadges: Observable<number>;

  constructor(
    public config: Config,
    private profileService: ProfileService,
    private loyaltyService: LoyaltyService,
    private configService: ConfigService,
    private translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private themesService: ThemesService,
    private settingsService: SettingsService,
    private badgeService: V4BadgeService,
  ) {
    this.preAuth = config.preAuth || false;
  }

  public ngOnInit(): void {
    this.theme = this.themesService.getThemeSetting();
    this.settingsService
      .getAccountSettings()
      .pipe(
        map((settings: PagesObject) => settings.pages),
        tap((pages: AccountPageObject[]) => (this.pages = pages)),
        filter((pages: AccountPageObject[]) => pages.length > 0)
      )
      .subscribe();
    this.settingsService.getRemoteFlagsSettings().subscribe((flags: IFlags) => {
      this.remoteFlags = flags;
    });
    this.appConfig$ = this.configService.readAppConfig();
    this.profile$ = this.profileService.whoAmI().pipe(take(1));
    this.loyalty$ = this.loyaltyService.getLoyalty();
    this.memberFn = (membershipTierName: string) =>
      this.translate
        .get([membershipTierName, 'HOME.MEMBER'])
        .pipe(map((res) => `${res[membershipTierName]}${res['HOME.MEMBER']}`));
    this.getAchievedBadgeCount();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public goToPage(page: AccountPageObject): void {
    if (page.key) {
      this.router.navigate(['/c', page.key]);
    } else {
      const a = document.createElement('a');
      a.href = page.content_url;
      a.target = '_blank';
      a.click();
    }
  }

  private getAchievedBadgeCount(): void {
    this.acquiredBadges = this.badgeService.getAchievedBadgeCount();
  }
}
