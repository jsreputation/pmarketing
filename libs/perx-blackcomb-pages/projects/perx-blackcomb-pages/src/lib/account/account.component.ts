import { Component, OnInit } from '@angular/core';
import { take, tap, flatMap, map, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
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
  ILoyalty
} from '@perx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public profile: IProfile;
  public loyalty: ILoyalty;
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
    private themesService: ThemesService
  ) {
    this.preAuth = config.preAuth || false;
  }

  public ngOnInit(): void {
    this.theme = this.themesService.getThemeSetting();
    this.configService.getAccountSettings()
      .pipe(
        map((settings: PagesObject) => settings.pages),
        tap((pages: AccountPageObject[]) => this.pages = pages),
        filter((pages: AccountPageObject[]) => pages.length > 0),
        flatMap((pages: AccountPageObject[]) => this.translate.get(pages.map((page: AccountPageObject) => page.title))),
      )
      .subscribe((translations) => this.pages.forEach((page) => page.title = translations[page.title]));
    this.appConfig = this.configService.readAppConfig();
    this.profileService.whoAmI()
      .pipe(take(1))
      .subscribe(profile => this.profile = profile);
    this.loyaltyService.getLoyalty().subscribe((loyalty: ILoyalty) => this.loyalty = loyalty);
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public onProfileClicked(): void {
    this.router.navigateByUrl('profile');
  }
}
