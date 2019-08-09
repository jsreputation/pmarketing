import { Component, OnInit } from '@angular/core';
import { BarSelectedItem } from 'src/app/page-properties';
import { ProfileService, IProfile } from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile: IProfile;
  public conditions: string[];

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      // customProperties test data
      res.customProperties = {...res.customProperties, Diabetes: 'false', 'Pre-Diabetes': 'true', Hypertension: 'true'};
      this.profile = res;

      this.conditions = Object.keys(res.customProperties).filter((key) => {
        if (res.customProperties[key] === 'true') {
          return key;
        }
      });
    });
  }

  public showHeader(): boolean {
    return false;
  }

  public backButtonEnabled(): boolean {
    return true;
  }

  public bottomSelectedItem(): BarSelectedItem {
    return BarSelectedItem.ACCOUNT;
  }

  public onSubScreenNavigate(path: string): void {
    this.router.navigate([path]);
  }

}
