import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '@cl-core/services/settings.service';
import { ClValidators } from '@cl-helpers/cl-validators';

@Component({
  selector: 'cl-invite-new-users-popup',
  templateUrl: './invite-new-users-popup.component.html',
  styleUrls: ['./invite-new-users-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InviteNewUsersPopupComponent implements OnInit {
  @ViewChild('stepper', {static: false}) public stepper: MatStepper;
  public form: FormGroup;
  public config;

  constructor(public dialogRef: MatDialogRef<InviteNewUsersPopupComponent>,
              private fb: FormBuilder,
              private settingsService: SettingsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.settingsService.getRolesOptions().subscribe(config => this.config = config);
    this.initForm();
  }

  public get isFirstStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === 0;
  }

  public goBack(): void {
    this.stepper.previous();
  }

  public goNext(): void {
    this.stepper.next();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public invite(): void {
    this.dialogRef.close();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(50),
        ClValidators.email]],
      role: [null, [Validators.required]]
    });
  }
}
