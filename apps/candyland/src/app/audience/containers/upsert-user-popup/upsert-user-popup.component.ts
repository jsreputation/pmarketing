import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';

import { ClValidators } from '@cl-helpers/cl-validators';
import { ICountries } from '@cl-core/models/survey/survey-common.interface';
import {
  AudiencesService,
  SurveyService,
} from '@cl-core-services';

import { Type } from '../../audience.model';

@Component({
  selector: 'cl-upsert-user-popup',
  templateUrl: './upsert-user-popup.component.html',
  styleUrls: ['./upsert-user-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpsertUserPopupComponent implements OnInit {
  public form: FormGroup;
  public pools: any;
  public countriesList$: Observable<ICountries>;
  public config: { [key: string]: OptionConfig[] } = {
    gender: [
      {title: 'Male', value: 'male'},
      {title: 'Female', value: 'female'}
    ],
    audienceList: [
      {title: 'AUDIENCE_FEATURE.GOLD_USERS', value: 'Gold_users'},
      {title: 'AUDIENCE_FEATURE.SILVER_TIER', value: 'Silver_tier'},
      {title: 'AUDIENCE_FEATURE.BRONZE_TIER', value: 'Bronze_tier'}
    ]
  };

  private loadCountries(): void {
    this.countriesList$ = this.surveyService.getDefaultCountryCode();
  }

  constructor(public dialogRef: MatDialogRef<UpsertUserPopupComponent>,
              private fb: FormBuilder,
              private audiencesService: AudiencesService,
              private surveyService: SurveyService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public get title(): string | null {
    switch (this.data.type) {
      case Type.Add:
        return 'AUDIENCE_FEATURE.ADD_USER';
      case Type.Edit:
        return 'AUDIENCE_FEATURE.EDIT_USER';
      default:
        return null;
    }
  }

  public get btnLabel(): string | null {
    switch (this.data.type) {
      case Type.Add:
        return 'BTN_ADD';
      case Type.Edit:
        return 'BTN_EDIT';
      default:
        return null;
    }
  }

  public get firstName(): AbstractControl {
    return this.form.get('firstName');
  }

  public get lastName(): AbstractControl {
    return this.form.get('lastName');
  }

  public get email(): AbstractControl {
    return this.form.get('email');
  }

  public get phone(): AbstractControl {
    return this.form.get('phone');
  }

  public get audienceList(): AbstractControl {
    return this.form.get('audienceList');
  }

  public ngOnInit(): void {
    this.loadCountries();
    this.initForm();
    this.setForm();
    this.getPools();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public upsert(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50),
        ClValidators.email]],
      phone: [null, Validators.required],
      gender: [],
      birthday: [],
      race: [],
      country: [],
      nationality: [],
      city: [],
      state: [],
      audienceList: [],
      file: [null, [
        // Validators.required
      ]]
    });
  }

  private setForm(): void {
    if (!this.data.formData) {
      return;
    }

    const { formData } = this.data;
    this.firstName.setValue(formData.first_name);
    this.lastName.setValue(formData.last_name);
    this.email.setValue(formData.email_address);
    this.phone.setValue(formData.phone_number);
  }

  private getPools(): any {
    this.audiencesService.getAudiencesList()
      .subscribe((data: any) => {
        this.pools = data;
      });
  }
}
