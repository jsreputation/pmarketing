import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPopupConfig } from '@perx/core';

export interface IRewardPopupConfig extends IPopupConfig {
    validTo?: Date;
    timerCallbacks?: TimerCallBack;
}
export interface TimerCallBack {
    timerExpired(): void;
    timerExpiring(): void;
}

@Component({
  selector: 'app-reward-popup',
  templateUrl: './reward-popup.component.html',
  styleUrls: ['./reward-popup.component.scss']
})
export class RewardPopupComponent {

  public text: string = null;
  public imageUrl: string = null;
  public buttonTxt: string = null;
  public validTo: Date;

  constructor(
    public dialogRef: MatDialogRef<RewardPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRewardPopupConfig
  ) {
    if (data.disableOverlayClose) {
      dialogRef.disableClose = data.disableOverlayClose;
    }
    if (data.text) {
      this.text = data.text;
    }
    if (data.buttonTxt !== undefined) {
      this.buttonTxt = data.buttonTxt;
    }
    if (data.imageUrl) {
      this.imageUrl = data.imageUrl;
    }
    if (data.validTo) {
      this.validTo = data.validTo;
    }
  }

  public onTimerExpired(): void {
    if (this.data.timerCallbacks) {
      this.data.timerCallbacks.timerExpired();
    }
  }

  public onExpiring(): void {
    if (this.data.timerCallbacks) {
      this.data.timerCallbacks.timerExpiring();
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public buttonPressed(): void {
    this.dialogRef.close();
    if (this.data.afterClosedCallBack) {
      this.data.afterClosedCallBack.dialogClosed();
    }
  }
}
