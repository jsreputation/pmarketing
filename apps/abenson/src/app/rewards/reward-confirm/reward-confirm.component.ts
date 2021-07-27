import { Component, Inject } from '@angular/core';
import { IRewardConfirmComponentParam } from '../reward-detail/reward-detail.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPopupConfig } from '@perxtech/core';

@Component({
  selector: 'app-reward-confirm',
  templateUrl: './reward-confirm.component.html',
  styleUrls: ['./reward-confirm.component.scss']
})
export class RewardConfirmComponent {
  public showButton: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<RewardConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRewardConfirmComponentParam,
    @Inject(MAT_DIALOG_DATA) public dataPopup: IPopupConfig
) {
    if (dataPopup.disableOverlayClose) {
      dialogRef.disableClose = dataPopup.disableOverlayClose;
    }

    if (dataPopup.hideButton) {
      this.showButton = false;
    }
  }
  public closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
