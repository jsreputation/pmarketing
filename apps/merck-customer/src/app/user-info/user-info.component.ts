import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService, ICustomProperties, NotificationService } from '@perx/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mc-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements PageAppearence {

  public surveyForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private notificationService: NotificationService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.surveyForm = this.fb.group({
      diabetesCondition: [false],
      diabetes: [''],
      hypertension: [false]
    });
  }

  public getPageProperties(): PageProperties {
    return {
      header: false,
      backButtonEnabled: false,
      bottomSelectedItem: BarSelectedItem.NONE,
      pageTitle: ''
    };
  }

  public diabetesConditionUpdated(isChecked: boolean): void {
    const formvalue = isChecked ? 'diabetes' : '';
    this.surveyForm.controls.diabetes.setValue(formvalue);
  }

  public onNext(): void {

    const customProperties: ICustomProperties = {
                                diabetes: (this.surveyForm.get('diabetesCondition').value).toString(),
                                diabetesState: (this.surveyForm.get('diabetes').value),
                                hypertension: (this.surveyForm.get('hypertension').value).toString()
                              };
    this.profileService.setCustomProperties(customProperties).subscribe(
      () => {
        this.router.navigateByUrl('/home');
        this.notificationService.addSnack('Condition saved.');
      },
      err => {
        this.notificationService.addSnack('ProfileService::SetCustomProperties : ' + err);
      });
  }
}
