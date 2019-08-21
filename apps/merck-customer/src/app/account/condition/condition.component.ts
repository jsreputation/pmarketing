import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { ProfileService, IProfile, NotificationService } from '@perx/core';
import { MatRadioChange, MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'mc-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit, PageAppearence {
  public showDiabetesCondition: boolean = false;
  public profile: IProfile;
  public conditions: string[];

  constructor(
    private profileService: ProfileService,
    private notificationService: NotificationService
  ) {

  }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
      Object.keys(res.customProperties).forEach((key) => {
        if (key === 'diabetes' && res.customProperties[key] === 'true') {
          this.showDiabetesCondition = true;
        }
      });
    });
  }

  public toggleDiabetesButtonGroupVisibilty(event: MatSlideToggleChange): void {
    this.showDiabetesCondition = event.checked;
    if (event.checked) {
      this.profile.customProperties.diabetes = 'true';
      this.profile.customProperties.diabetesState = 'diabetes';
    } else {
      this.profile.customProperties.diabetes = 'false';
      this.profile.customProperties.diabetesState = '';
    }
    this.updateCondition();
  }

  public isDiabetesState(state: string): boolean {
    return this.profile.customProperties.diabetesState === state;
  }

  public isChecked(condition: string): boolean {
    return this.profile.customProperties[condition] === 'true';
  }

  public onDiabetesConditionChanged(event: MatRadioChange): void {
    this.profile.customProperties.diabetesState = event.value;
    this.updateCondition();
  }

  public onHypertensionConditionChanged(event: MatSlideToggleChange): void {
    this.profile.customProperties.hypertension = event.checked.toString();
    this.updateCondition();
  }

  private updateCondition(): void {
    this.profileService.setCustomProperties(this.profile.customProperties).subscribe(
      () => this.notificationService.addSnack('Condition Updated.'),
      err => {
        this.notificationService.addSnack('ProfileService::SetCustomProperties : ' + err);
    });
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'Condition'
    };
  }

}
