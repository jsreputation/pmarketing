import { Component, OnInit } from '@angular/core';
import { AuthenticationService, IProfile, ProfileService } from '@perx/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public profile: IProfile;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private profileService: ProfileService,
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

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
