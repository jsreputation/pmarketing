import { Component, OnInit } from '@angular/core';
import { take, tap, flatMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {
  ProfileService,
  IProfile,
  ThemesService,
  AuthenticationService,
  Config,
  PagesObject,
  AccountPageObject,
} from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public profile: IProfile;
  public pages!: AccountPageObject[];
  public preAuth: boolean = false;

  constructor(
    public config: Config,
    private profileService: ProfileService,
    private themeService: ThemesService,
    private translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.preAuth = config.preAuth || false;
  }

  public ngOnInit(): void {
    this.themeService.getAccountSettings()
      .pipe(
        tap((settings: PagesObject) => this.pages = settings.pages),
        flatMap((settings) => this.translate.get(settings.pages.map((page) => page.title))),
      )
      .subscribe((translations) => this.pages.forEach((page) => page.title = translations[page.title]));
    this.profileService.whoAmI()
      .pipe(
        take(1)
      )
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
