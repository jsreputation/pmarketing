import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { ProfileService, IProfile, NotificationService } from '@perxtech/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'mc-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit, PageAppearence {
  public showDiabetesCondition: boolean = false;
  public profile: IProfile;
  public conditions: string[];
  private conditionUpdateTxt: string;

  constructor(
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.translate.get('ACCOUNT.CONDITION_UPDATED').subscribe(text => this.conditionUpdateTxt = text);
  }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
      if (!res.customProperties) {
        return;
      }
      Object.keys(res.customProperties).forEach((key) => {
        if (key === 'diabetes' && res.customProperties && res.customProperties[key] === 'true') {
          this.showDiabetesCondition = true;
        }
      });
    });
  }

  public toggleDiabetesButtonGroupVisibilty(event: MatSlideToggleChange): void {
    this.showDiabetesCondition = event.checked;
    if (event.checked && this.profile.customProperties) {
      this.profile.customProperties.diabetes = 'true';
      this.profile.customProperties.diabetesState = 'diabetes';
    } else if (this.profile.customProperties) {
      this.profile.customProperties.diabetes = 'false';
      this.profile.customProperties.diabetesState = '';
    }
    this.updateCondition();
  }

  public isDiabetesState(state: string): boolean {
    return !!this.profile.customProperties && this.profile.customProperties.diabetesState === state;
  }

  public isChecked(condition: string): boolean {
    return !!this.profile.customProperties && this.profile.customProperties[condition] === 'true';
  }

  public onDiabetesConditionChanged(event: MatRadioChange): void {
    if (!this.profile.customProperties) {
      return;
    }
    this.profile.customProperties.diabetesState = event.value;
    this.updateCondition();
  }

  public onHypertensionConditionChanged(event: MatSlideToggleChange): void {
    if (!this.profile.customProperties) {
      return;
    }
    this.profile.customProperties.hypertension = event.checked.toString();
    this.updateCondition();
  }

  private updateCondition(): void {
    if (!this.profile.customProperties) {
      return;
    }
    this.profileService.setCustomProperties(this.profile.customProperties).subscribe(
      () => this.notificationService.addSnack(this.conditionUpdateTxt),
      err => this.notificationService.addSnack(err.error.message)
    );
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'NAVIGATION.CONDITION'
    };
  }

}
