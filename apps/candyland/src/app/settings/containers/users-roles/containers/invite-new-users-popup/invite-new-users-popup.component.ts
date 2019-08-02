import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from '@cl-core/services/settings.service';

@Component({
  selector: 'cl-invite-new-users-popup',
  templateUrl: './invite-new-users-popup.component.html',
  styleUrls: ['./invite-new-users-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InviteNewUsersPopupComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    role: []
  });
  public config;

  constructor(public dialogRef: MatDialogRef<InviteNewUsersPopupComponent>,
              private fb: FormBuilder,
              private settingsService: SettingsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.settingsService.getRolesOptions().subscribe( config => this.config = config);
  }

  public close() {
    this.dialogRef.close();
  }

  public add() {
      this.dialogRef.close();
  }

}
