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
import { oc } from 'ts-optchain';

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
  public genders: OptionConfig[] = [
    { title: 'Male', value: 'male' },
    { title: 'Female', value: 'female' }
  ];

  private initAudienceList(): void {
    if (!(this.data && this.data.formData)) {
      return;
    }

    const userPools: string[] = this.data.formData.audienceList;
    const userAudienceList: any[] = this.pools.filter((pool) => userPools.includes(pool.name));
    const valuesAudienceList: string[] = userAudienceList.map((audience) => audience.value);
    this.audienceList.setValue(valuesAudienceList);
  }

  private loadCountries(): void {
    this.countriesList$ = this.surveyService.getDefaultCountryCode();
  }

  private loadPools(): void {
    this.audiencesService.getAudiencesList()
      .subscribe((data) => {
        this.pools = data;
        this.initAudienceList();
      });
  }

  constructor(
    public dialogRef: MatDialogRef<UpsertUserPopupComponent>,
    private fb: FormBuilder,
    private audiencesService: AudiencesService,
    private surveyService: SurveyService,
    @Inject(MAT_DIALOG_DATA) public data: { type: Type, formData: IAudiencesUserForm }
  ) {
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

  public get btnLabel(): string {
    switch (this.data.type) {
      case Type.Add:
        return 'BTN_ADD';
      case Type.Edit:
      default:
        return 'BTN_SAVE';
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
    this.loadPools();
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
    let controlsConfig: { [key: string]: any; };
    if (this.data.type === Type.Edit && this.data.formData) {
      const { formData } = this.data;
      controlsConfig = {
        firstName: [formData.firstName, Validators.required],
        lastName: [formData.lastName, Validators.required],
        email: [formData.email, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
          ClValidators.email]],
        phone: [formData.phone, Validators.required],
        gender: [oc(formData).gender()],
        birthday: [oc(formData).birthday() ? new Date(formData.birthday) : null, null],
        race: [oc(formData).race(), null],
        country: [oc(formData).country(), null],
        nationality: [oc(formData).nationality(), null],
        city: [oc(formData).city(), null],
        state: [oc(formData).state(), null],
        audienceList: [],
        file: [null, [
          // Validators.required
        ]]
      };
    } else {
      controlsConfig = {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
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
      };
    }
    this.form = this.fb.group(controlsConfig);
  }
}
