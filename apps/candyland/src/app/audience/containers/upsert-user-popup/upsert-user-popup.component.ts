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

import { ClValidators } from '@cl-helpers/cl-validators';
import { AudiencesService } from '@cl-core-services';

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
  public config: { [key: string]: OptionConfig[] } = {
    gender: [
      {title: 'Male', value: 'male'},
      {title: 'Female', value: 'female'}
    ],
    country: [
      {title: 'Country 1', value: 'country1'},
      {title: 'Country 2', value: 'country2'}
    ],
    audienceList: [
      {title: 'AUDIENCE_FEATURE.GOLD_USERS', value: 'Gold_users'},
      {title: 'AUDIENCE_FEATURE.SILVER_TIER', value: 'Silver_tier'},
      {title: 'AUDIENCE_FEATURE.BRONZE_TIER', value: 'Bronze_tier'}
    ]
  };

  constructor(public dialogRef: MatDialogRef<UpsertUserPopupComponent>,
              private fb: FormBuilder,
              private audiencesService: AudiencesService,
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
    this.initForm();
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
    let controlsConfig: { [key: string]: any; };
    if (this.data.type === Type.Edit && this.data.formData) {
      const { formData } = this.data;
      controlsConfig = {
        firstName: [formData.first_name, Validators.required],
        lastName: [formData.last_name, Validators.required],
        email: [formData.email_address, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
          ClValidators.email]],
        phone: [formData.phone_number, Validators.required],
        gender: [formData.properties ? formData.properties.gender : null, null],
        birthday: [formData.properties ? formData.properties.birthday : null, null],
        race: [formData.properties ? formData.properties.race : null, null],
        country: [formData.properties ? formData.properties.country : null, null],
        nationality: [formData.properties ? formData.properties.nationality : null, null],
        city: [formData.properties ? formData.properties.city : null, null],
        state: [formData.properties ? formData.properties.state : null, null],
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
      };
    }
    this.form = this.fb.group(controlsConfig);
  }

  private getPools(): any {
    this.audiencesService.getAudiencesList()
      .subscribe((data: any) => {
        this.pools = data;
      });
  }
}
