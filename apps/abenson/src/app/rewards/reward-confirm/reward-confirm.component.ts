import { Component, Inject } from '@angular/core';
import { IRewardConfirmComponentParam } from '../reward-detail/reward-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reward-confirm',
  templateUrl: './reward-confirm.component.html',
  styleUrls: ['./reward-confirm.component.scss']
})
export class RewardConfirmComponent {

  constructor(
    private dialogRef: MatDialogRef<RewardConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRewardConfirmComponentParam
  ) {
  }
  public closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }
}
