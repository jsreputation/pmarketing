import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPopupConfig } from '../../utils/popup/popup.component';

export interface IRewardPopupConfig extends IPopupConfig {
  validTo?: Date;
  timerCallbacks?: TimerCallBack;
  afterClosedCallBackRedirect?: PopUpClosedCallBack;
  url?: string;
}
export interface TimerCallBack {
  timerExpired(): void;
  timerExpiring(): void;
}

export interface PopUpClosedCallBack {
  closeAndRedirect(url: string): void;
}

@Component({
  selector: 'perx-core-reward-popup',
  templateUrl: './reward-popup.component.html',
  styleUrls: ['./reward-popup.component.scss']
})
export class RewardPopupComponent {
  public title: string;
  public text: string;
  public imageUrl: string;
  public buttonTxt: string;
  public validTo: Date;

  constructor(
    public dialogRef: MatDialogRef<RewardPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRewardPopupConfig
  ) {
    if (data.disableOverlayClose) {
      dialogRef.disableClose = data.disableOverlayClose;
    }
    if (data.title) {
      this.title = data.title;
    }
    if (data.text) {
      this.text = data.text;
    }
    if (data.buttonTxt) {
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
    if (this.data.afterClosedCallBackRedirect && this.data.url) {
      this.data.afterClosedCallBackRedirect.closeAndRedirect(this.data.url);
    }
  }
}
