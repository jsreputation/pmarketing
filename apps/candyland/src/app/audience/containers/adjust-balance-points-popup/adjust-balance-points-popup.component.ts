import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef, AfterViewInit, OnInit, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAudiencesLoyaltyCard } from '@cl-core/models/audiences/audiences-loyalty.model';

@Component({
  selector: 'cl-adjust-balance-points-popup',
  templateUrl: './adjust-balance-points-popup.component.html',
  styleUrls: ['./adjust-balance-points-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdjustBalancePointsPopupComponent implements OnInit, AfterViewInit {
  public form: FormGroup;

  public get balance(): AbstractControl {
    return this.form ? this.form.get('balance') : null;
  }

  public get description(): AbstractControl {
    return this.form ? this.form.get('description') : null;
  }

  constructor(public dialogRef: MatDialogRef<AdjustBalancePointsPopupComponent>,
    private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: IAudiencesLoyaltyCard) {
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      balance: new FormControl(0, [Validators.required, Validators.min(0)]),
      // description: new FormControl('')
    });
  }

  public ngAfterViewInit(): void {
    this.balance.patchValue(this.data.balance);
    this.cd.detectChanges();
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public save(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    const updatedCard = {id: this.data.id, balance: this.balance.value};
    this.dialogRef.close(updatedCard);
  }
}
