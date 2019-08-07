import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'cl-reward-replenish-popup',
  templateUrl: './reward-replenish-popup.component.html',
  styleUrls: ['./reward-replenish-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardReplenishPopupComponent  {
  public replenishVoucherCodes = null;

  constructor(public dialogRef: MatDialogRef<RewardReplenishPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public replenish(): void {
    if (this.replenishVoucherCodes) {
      this.dialogRef.close(this.replenishVoucherCodes);
    }
  }

  public setReplenishVoucherCodes(value: any): void {
    this.replenishVoucherCodes = value;
  }

}
