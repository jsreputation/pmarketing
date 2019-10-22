import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import {
  ProfileService,
  IProfile,
  AuthenticationService,
  IVoucherService,
} from '@perx/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public profile: IProfile;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private vouchersService: IVoucherService,
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI()
      .pipe(
        take(1)
      )
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  public onClick(url: string): void {
    this.router.navigate([url]);
  }

  public onSignout(): void {
    this.vouchersService.reset();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
