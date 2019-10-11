import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService, ThemesService } from '@perx/core';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AccountPageObject {
  title: string;
  content_url: string;
  key: string;
}
@Component({
  selector: 'app-account',
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
