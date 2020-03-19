import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfileService, AuthenticationService, IProfile } from '@perxtech/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public personalData: FormGroup;
  public profile: IProfile;

  constructor(
    private personalProfile: ProfileService,
    private auth: AuthenticationService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.personalProfile.whoAmI()
      .pipe(
        take(1)
      )
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  public logOut(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
