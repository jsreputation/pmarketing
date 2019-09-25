import { Component, Inject } from '@angular/core';
import { IRewardConfirmComponentParam } from '../reward-detail/reward-detail.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  public confirm(): void {
    this.dialogRef.close(true);
  }

  public back(): void {
    this.dialogRef.close(false);
  }

}
