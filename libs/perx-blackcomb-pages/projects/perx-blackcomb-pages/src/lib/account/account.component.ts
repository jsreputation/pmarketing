import { Component, OnInit } from '@angular/core';
import { ProfileService, IProfile, ThemesService } from '@perx/core';
import { take } from 'rxjs/operators';

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
  public pages!: AccountPageObject[] ;

  constructor(
    private profileService: ProfileService,
    private themeService: ThemesService
  ) { }

  public ngOnInit(): void {
    this.themeService.getAccountSettings()
      .subscribe((settings) => this.pages = settings.pages);
    this.profileService.whoAmI()
      .pipe(
        take(1)
      )
      .subscribe(profile => {
        this.profile = profile;
      });
  }

}
