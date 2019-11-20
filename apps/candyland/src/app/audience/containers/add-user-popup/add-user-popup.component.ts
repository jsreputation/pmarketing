import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClValidators } from '@cl-helpers/cl-validators';
import { AudiencesService } from '@cl-core-services';

@Component({
  selector: 'cl-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserPopupComponent implements OnInit {
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

  constructor(public dialogRef: MatDialogRef<AddUserPopupComponent>,
              private fb: FormBuilder,
              private audiencesService: AudiencesService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.getPools();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public add(): void {
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

  private getPools(): any {
    this.audiencesService.getAudiencesList()
      .subscribe((data: any) => {
        this.pools = data;
      });
  }
}
