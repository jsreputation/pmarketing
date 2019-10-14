import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AbstractControl, FormGroup } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';
import { LoyaltyFormsService } from 'src/app/loyalty/services/loyalty-forms.service';

@Component({
  selector: 'cl-tier-setup-popup',
  templateUrl: './tier-setup-popup.component.html',
  styleUrls: ['./tier-setup-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TierSetupPopupComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<TierSetupPopupComponent>,
              private loyaltyFormsService: LoyaltyFormsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public get pointsThreshold(): AbstractControl {
    return this.form.get('qualification.pointsThreshold') || null;
  }

  public get points(): AbstractControl {
    return this.form.get('qualification.points') || null;
  }

  public ngOnInit(): void {
    this.initForm();
    this.handlePointsThreshold();
  }

  public ngOnDestroy(): void {
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

  private handlePointsThreshold(): void {
    this.pointsThreshold.valueChanges.pipe(
      untilDestroyed(this),
      distinctUntilChanged()
    ).subscribe((value: boolean) => {
      if (value) {
        this.points.enable();
      } else {
        this.points.disable();
      }
    });
  }
}
