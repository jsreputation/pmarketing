import { Component, OnInit } from '@angular/core';

import {
  ProfileService,
  IProfile,
  LoyaltyService,
  ILoyalty,
  ICustomProperties,
  ConfigService,
  IConfig
} from '@perxtech/core';
import { Router } from '@angular/router';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { TranslateService } from '@ngx-translate/core';
import { IMerckConfig } from '../../model/IMerck.model';

@Component({
  selector: 'mc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, PageAppearence {
  public profile: IProfile;
  public conditions: string[];
  public tier?: string;
  public currentSelectedLanguage: string;
  public selectedLanguage: string;
  public showConditions: boolean;

  constructor(
    private profileService: ProfileService,
    private configService: ConfigService,
    private router: Router,
    private loyaltyService: LoyaltyService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.currentSelectedLanguage = this.translate.currentLang || this.translate.defaultLang;
    this.selectedLanguage = this.currentSelectedLanguage === 'zh' ? '中文' : 'English';
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
      this.conditions = this.getConditionsFromProfile(res);
    });
    this.configService.readAppConfig<IMerckConfig>().subscribe(
      (config: IConfig<IMerckConfig>) => {
        this.showConditions = config.custom ? config.custom.showConditions as boolean : false;
      }
    );

    this.loyaltyService.getLoyalty().subscribe((loyalty: ILoyalty) => this.tier = loyalty.membershipTierName);
  }

  private getConditionsFromProfile(profile: IProfile): string[] {
    const filteredConditions: string[] = [];
    if (!profile.customProperties) {
      return [];
    }
    const customProperties: ICustomProperties = profile.customProperties;
    Object.keys(profile.customProperties).forEach(property => {
      if (property === 'diabetesState') {
        const diabetesState = customProperties[property];
        if (diabetesState && typeof diabetesState === 'string') {
          if (diabetesState === 'pre_diabetes') {
            this.translate.get('ACCOUNT_PAGE.PRE_DIABETES').subscribe((text) => filteredConditions.push(text));
          } else if (diabetesState === 'diabetes') {
            this.translate.get('ACCOUNT_PAGE.DIABETES').subscribe((text) => filteredConditions.push(text));
          }
        }
      }
      if (property === 'hypertension' && customProperties[property] === 'true') {
        this.translate.get('ACCOUNT_PAGE.HYPERTENSION').subscribe((text) => filteredConditions.push(text));
      }
    });
    return filteredConditions.filter(condition => condition !== '');
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'NAVIGATION.PROFILE'
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
