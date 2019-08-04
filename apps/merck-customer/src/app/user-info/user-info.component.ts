import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { ProfileService, ICustomProperties, NotificationService } from '@perx/core';
import { PageProperties, BAR_SELECTED_ITEM } from '../page-properties';

@Component({
  selector: 'mc-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, PageProperties {

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
  public ngOnInit(): void {}

  public showHeader(): boolean {
    return false;
  }

  public bottomSelectedItem(): BAR_SELECTED_ITEM {
    return BAR_SELECTED_ITEM.NONE;
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
      },
      err => {
        console.error('ProfileService::SetCustomProperties : ' + err);
        this.notificationService.addSnack('ProfileService::SetCustomProperties : ' + err);
        this.router.navigateByUrl('/home'); // TODO: ProfileService is not set yet.
                                              // Remove this line once done.
      });
  }
}
