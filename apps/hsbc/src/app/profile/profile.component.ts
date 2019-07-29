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
  profile: IProfile;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.profileService.whoAmI()
      .pipe(
        take(1)
      )
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  onClick(url: string) {
    this.router.navigate([url]);
  }

  onSignout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
