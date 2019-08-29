import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClValidators } from '@cl-helpers/cl-validators';

@Component({
  selector: 'cl-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserPopupComponent implements OnInit {

  public form: FormGroup;
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
      {title: 'Gold_users', value: 'Gold_users'},
      {title: 'Silver tier', value: 'Silver_tier'},
      {title: 'Bronze tier', value: 'Bronze_tier'}
    ],
  };

  constructor(public dialogRef: MatDialogRef<AddUserPopupComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public add(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
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
      file: [],
    });
  }
}
