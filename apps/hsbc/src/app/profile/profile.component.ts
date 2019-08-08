import { Component, OnInit } from '@angular/core';
import { ProfileService, IProfile, AuthenticationService } from '@perx/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile: IProfile;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthenticationService
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
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
