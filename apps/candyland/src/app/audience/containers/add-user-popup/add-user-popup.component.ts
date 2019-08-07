import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserPopupComponent {

  public form: FormGroup;
  public config: { [key: string]: OptionConfig[] } = {
    gender: [
      {title: 'Male', value: 'male'},
      {title: 'Female', value: 'female'}
    ],
    country: [
      {title: 'Male', value: 'male'},
      {title: 'Female', value: 'female'}
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
    this.initForm();
  }

  public close() {
    this.dialogRef.close();
  }

  public add() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  private initForm() {
    this.form = this.fb.group({
      firstName: [],
      lastName: [],
      email: [],
      phone: [],
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
