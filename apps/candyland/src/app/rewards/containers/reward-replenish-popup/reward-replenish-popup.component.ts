import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'cl-reward-replenish-popup',
  templateUrl: './reward-replenish-popup.component.html',
  styleUrls: ['./reward-replenish-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardReplenishPopupComponent implements OnInit {
  public replenishVoucherCodes = null;

  constructor(public dialogRef: MatDialogRef<RewardReplenishPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public close() {
    this.dialogRef.close();
  }

  public replenish() {
    if (this.replenishVoucherCodes) {
      this.dialogRef.close(this.replenishVoucherCodes);
    }
  }

  public setReplenishVoucherCodes(value: any): void {
    this.replenishVoucherCodes = value;
  }

}
