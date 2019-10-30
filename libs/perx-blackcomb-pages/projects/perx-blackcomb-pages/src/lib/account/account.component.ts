import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import {
  ProfileService,
  IProfile,
  ThemesService,
  AuthenticationService,
} from '@perx/core';
import { environment } from '@perx/blackcomb/src/environments/environment';

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
  public preAuth: boolean = false;

  constructor(
    private profileService: ProfileService,
    private themeService: ThemesService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.preAuth = environment.preAuth;
  }

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

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
