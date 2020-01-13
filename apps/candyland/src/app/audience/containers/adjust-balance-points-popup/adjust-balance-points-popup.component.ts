import { Component, OnInit, ChangeDetectionStrategy, Inject, DoCheck, ChangeDetectorRef, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-adjust-balance-points-popup',
  templateUrl: './adjust-balance-points-popup.component.html',
  styleUrls: ['./adjust-balance-points-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdjustBalancePointsPopupComponent implements OnInit, DoCheck {
  public newDate: FormControl = new FormControl(null);

  constructor(public dialogRef: MatDialogRef<AdjustBalancePointsPopupComponent>,
              private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public save(): void {
    this.dialogRef.close(this.newDate.value);
  }

  public ngOnInit(): void {
  }

  public ngDoCheck(): void {
    this.cd.detectChanges();
  }

}
