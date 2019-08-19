import { Component, OnInit } from '@angular/core';

import { ProfileService, IProfile } from '@perx/core';
import { Router } from '@angular/router';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';

@Component({
  selector: 'mc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, PageAppearence {
  public profile: IProfile;
  public conditions: string[];

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
      this.conditions = this.getConditionsFromProfile(res);
    });
  }

  private getConditionsFromProfile(profile: IProfile): string[] {
    const filteredConditions: string[] = [];
    Object.keys(profile.customProperties).forEach(property => {
        if (property === 'diabetesState') {
          const diabetesState = profile.customProperties[property];
          if (typeof diabetesState === 'string') {
            filteredConditions.push(diabetesState.replace('_', '-'));
          }
        }
        if (property === 'hypertension' && profile.customProperties[property] === 'true') {
          filteredConditions.push('Hypertension');
        }
      });
    return filteredConditions;
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'Profile'
    };
  }

  public onSubScreenNavigate(path: string): void {
    this.router.navigate([path]);
  }

  public onEditPasswordClicked(): void {
    // TODO: Currently sending empty 'otp'. There should be enter-pin step
    this.router.navigate(['reset-password'], { state: { mobileNo: this.profile.phone, otp: '' } });
  }
}
