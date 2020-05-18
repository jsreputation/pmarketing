import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  take,
  tap,
  flatMap,
  map,
  filter
} from 'rxjs/operators';
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
  ILoyalty, SettingsService,
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-account',
  templateUrl: './account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public profile$: Observable<IProfile> | null = null;
  public loyalty$: Observable<ILoyalty>;
  public pages!: AccountPageObject[];
  public preAuth: boolean = false;
  public theme: Observable<ITheme>;
  public appConfig: Observable<IConfig<void>>;

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
  ) {
    this.preAuth = config.preAuth || false;
  }

  public ngOnInit(): void {
    this.theme = this.themesService.getThemeSetting();
    this.settingsService.getAccountSettings()
      .pipe(
        map((settings: PagesObject) => settings.pages),
        tap((pages: AccountPageObject[]) => this.pages = pages),
        filter((pages: AccountPageObject[]) => pages.length > 0),
        flatMap((pages: AccountPageObject[]) => this.translate.get(pages.map((page: AccountPageObject) => page.title))),
      )
      .subscribe((translations) => this.pages.forEach((page) => page.title = translations[page.title]));
    this.appConfig = this.configService.readAppConfig();
    this.profile$ = this.profileService.whoAmI()
      .pipe(
        take(1)
      );
    this.loyalty$ = this.loyaltyService.getLoyalty();
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
}
