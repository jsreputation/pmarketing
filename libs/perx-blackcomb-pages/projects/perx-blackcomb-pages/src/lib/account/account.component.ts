import { Component, OnInit } from '@angular/core';
import { ProfileService, IProfile, ThemesService } from '@perx/core';
import { take, tap, flatMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

interface AccountPageObject {
  title: string;
  content_url: string;
  key: string;
}
@Component({
  selector: 'perx-blackcomb-pages-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public profile: IProfile;
  public pages!: AccountPageObject[];

  constructor(
    private profileService: ProfileService,
    private themeService: ThemesService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.themeService.getAccountSettings()
      .pipe(
        tap((settings) => this.pages = settings.pages),
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

}
