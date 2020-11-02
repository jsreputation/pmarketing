import { Component, OnInit } from '@angular/core';
import { AuthenticationService, IProfile, ProfileService } from '@perxtech/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public profile: Observable<IProfile>;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private profileService: ProfileService,
  ) { }

  public ngOnInit(): void {
    this.profile = this.profileService.whoAmI()
      .pipe(
        take(1)
      );
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
