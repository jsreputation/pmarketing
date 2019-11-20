import { Component, OnInit } from '@angular/core';

import { ProfileService, IProfile, LoyaltyService, ILoyalty, ICustomProperties } from '@perx/core';
import { Router } from '@angular/router';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, PageAppearence {
  public profile: IProfile;
  public conditions: string[];
  public tier?: string;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private loyaltyService: LoyaltyService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
      this.conditions = this.getConditionsFromProfile(res);
    });

    this.loyaltyService.getLoyalty().subscribe((loyalty: ILoyalty) => this.tier = loyalty.membershipTierName);
  }

  private getConditionsFromProfile(profile: IProfile): string[] {
    const filteredConditions: string[] = [];
    if(!profile.customProperties) {
      return [];
    }
    const customProperties: ICustomProperties = profile.customProperties;
    Object.keys(profile.customProperties).forEach(property => {
        if (property === 'diabetesState') {
          const diabetesState = customProperties[property];
          if (diabetesState && typeof diabetesState === 'string') {
            if (diabetesState === 'pre_diabetes') {
              this.translate.get('STATIC_PRE_DIABETES').subscribe((text) => filteredConditions.push(text));
            } else if (diabetesState === 'diabetes') {
              this.translate.get('STATIC_DIABETES').subscribe((text) => filteredConditions.push(text));
            }
          }
        }
        if (property === 'hypertension' && customProperties[property] === 'true') {
          this.translate.get('STATIC_HYPERTENSION').subscribe((text) => filteredConditions.push(text));
        }
      });
    return filteredConditions.filter(condition => condition !== '');
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'STATIC_PROFILE'
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
