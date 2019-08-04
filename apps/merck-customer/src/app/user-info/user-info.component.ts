import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@perx/core';
import { ICustomProperties } from '@perx/core/dist/perx-core/lib/profile/profile.model';
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
    private profileService: ProfileService
  ) {
        this.initForm();
  }

  private initForm(): void {
    this.surveyForm = this.fb.group({
      diabetes: ['', Validators.required],
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

  public onNext(): void {
    try {
      const diabetesValue = this.surveyForm.get('diabetes').value;
      const customProperties: ICustomProperties = {
                                  Diabetes: (diabetesValue === 'diabetes').toString(),
                                  'Pre-Diabetes': (diabetesValue === 'pre_diabetes').toString(),
                                  Hypertension: (this.surveyForm.get('hypertension').value).toString()
                                };
      this.profileService.setCustomProperties(customProperties).subscribe(
        () => {
          this.router.navigateByUrl('/home');
        },
        err => {
          console.error('ProfileService::SetCustomProperties : ' + err);
          this.router.navigateByUrl('/home'); // TODO: ProfileService is not set yet.
                                              // Remove this line once done.
        });
    } catch (error) {
        console.log(error);
    }
  }

}
