import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface IRewardConfirmComponentParam {
  title: string;
  existingPoints: number;
  requiredPoints: number;
}

@Component({
  selector: 'hkbn-reward-confirm',
  templateUrl: './reward-confirm.component.html',
  styleUrls: ['./reward-confirm.component.scss']
})
export class RewardConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<RewardConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRewardConfirmComponentParam
  ) {
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

  public back(): void {
    this.dialogRef.close(false);
  }

}
