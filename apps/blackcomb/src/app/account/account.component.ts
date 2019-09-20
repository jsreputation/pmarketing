import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from '@perx/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public profile: IProfile;

  constructor(
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

}
