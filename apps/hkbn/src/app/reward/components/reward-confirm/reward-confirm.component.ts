import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'hkbn-reward-confirm',
  templateUrl: './reward-confirm.component.html',
  styleUrls: ['./reward-confirm.component.scss']
})
export class RewardConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<RewardConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

  public back(): void {
    this.dialogRef.close(false);
  }

}
