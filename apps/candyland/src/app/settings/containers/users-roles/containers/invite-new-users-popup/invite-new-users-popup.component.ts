import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '@cl-core/services';
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
  public config: any[];

  constructor(public dialogRef: MatDialogRef<InviteNewUsersPopupComponent>,
              private fb: FormBuilder,
              private settingsService: SettingsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.settingsService.getAllGroups().subscribe(config => this.config = config.getModels());
    this.initForm();
    this.doPatchForm(this.data.user);
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
    this.dialogRef.close({...this.form.value});
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(50)]
      ],
      email: [null, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(50),
        ClValidators.email]],
      roleId: [null, [Validators.required]]
    });
  }

  private doPatchForm(data: IAMUser): void {
    return data && this.patchValue(data);
  }

  private patchValue(data: IAMUser): void {
    this.form.patchValue({
      name: data.username,
      email: data.email ? data.email : null,
      roleId: data.relationships_groups_id ? data.relationships_groups_id : null
    });
  }
}
