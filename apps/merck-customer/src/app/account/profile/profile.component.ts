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
      // customProperties test data
      res.customProperties = {...res.customProperties, diabetes: 'true', diabetesState: 'pre_diabetes', hypertension: 'true'};
      this.profile = res;
      const filteredConditions: string[] = [];
      Object.keys(res.customProperties).forEach(property => {
        if (property && property === 'diabetesState') {
          const diabetesState = res.customProperties[property];
          filteredConditions.push(String (diabetesState).replace('_', '-'));
        }
        if (res.customProperties[property] === 'true' && property === 'hypertension') {
          filteredConditions.push('Hypertension');
        }
      });
      this.conditions = filteredConditions;
    });
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
    console.log(this.profile);
    // TODO: Currently sending empty 'otp'. There should be enter-pin step
    this.router.navigate(['reset-password'], { state: { mobileNo: this.profile.phone, otp: '' } });
  }
}
