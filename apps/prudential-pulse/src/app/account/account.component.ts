import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { tap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import {
  ConfigService,
  IConfig,
  Config,
  PagesObject,
  AccountPageObject,
  ITheme,
  ThemesService,
  SettingsService,
  IFlags,
  BadgeService,
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-account',
  templateUrl: './account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public pages!: AccountPageObject[];
  public preAuth: boolean = false;
  public theme: Observable<ITheme>;
  public appConfig$: Observable<IConfig<void>>;
  public memberFn: (membershipTierName: string) => Observable<string>;
  public remoteFlags: IFlags;
  public acquiredBadges: Observable<number>;

  constructor(
    public config: Config,
    protected configService: ConfigService,
    protected translate: TranslateService,
    protected router: Router,
    protected themesService: ThemesService,
    protected settingsService: SettingsService,
    protected badgeService: BadgeService,
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
    this.getAchievedBadgeCount();
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

  protected getAchievedBadgeCount(): void {
    this.acquiredBadges = this.badgeService.getAchievedBadgeCount();
  }
}
