import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService, ICustomProperties, NotificationService } from '@perxtech/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mc-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements PageAppearence, OnInit {
  public conditionMessage: string;
  public surveyForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.translate.get('PROFILE.CONDITION_SAVED').subscribe((text) => this.conditionMessage = text);
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
      diabetes: this.surveyForm.value.diabetesCondition.toString(),
      diabetesState: this.surveyForm.value.diabetes.toString(),
      hypertension: this.surveyForm.value.hypertension.toString(),
      questionaire_answered: true
    };
    this.profileService.setCustomProperties(customProperties).subscribe(
      () => {
        this.router.navigateByUrl('/home');
        this.notificationService.addSnack(this.conditionMessage);
      },
      err => {
        this.notificationService.addSnack(`ProfileService::SetCustomProperties : ${err}`);
      });
  }
}
