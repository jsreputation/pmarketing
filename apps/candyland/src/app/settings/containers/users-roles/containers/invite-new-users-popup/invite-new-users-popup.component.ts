import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-invite-new-users-popup',
  templateUrl: './invite-new-users-popup.component.html',
  styleUrls: ['./invite-new-users-popup.component.scss']
})
export class InviteNewUsersPopupComponent implements OnInit {
  public form: FormGroup = this.fb.group({});

  constructor(public dialogRef: MatDialogRef<InviteNewUsersPopupComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }

  public add() {
      this.dialogRef.close();
  }

}
