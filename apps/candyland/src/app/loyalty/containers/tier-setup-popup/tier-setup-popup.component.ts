import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { LoyaltyFormsService } from 'src/app/loyalty/services/loyalty-forms.service';

@Component({
  selector: 'cl-tier-setup-popup',
  templateUrl: './tier-setup-popup.component.html',
  styleUrls: ['./tier-setup-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TierSetupPopupComponent implements OnInit {
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<TierSetupPopupComponent>,
              private loyaltyFormsService: LoyaltyFormsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.initForm();
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
    this.form = this.loyaltyFormsService.getTireForm();
  }
}
