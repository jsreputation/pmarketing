import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPopupConfig } from '@perx/core';

export interface IRewardPopupConfig extends IPopupConfig {
  afterClosedCallBackRedirect?: PopUpClosedCallBack;
  url?: string;
  didWin?: boolean;
}

export interface PopUpClosedCallBack {
  closeAndRedirect(url: string, didWin: boolean): void;
}

@Component({
  selector: 'app-reward-popup',
  templateUrl: './reward-popup.component.html',
  styleUrls: ['./reward-popup.component.scss']
})
export class RewardPopupComponent {
  public title: string|null = null;
  public text: string|null = null;
  public imageUrl: string|null = null;
  public buttonTxt: string|null = null;

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
    if (data.imageUrl) {
      this.imageUrl = data.imageUrl;
    }
    if (data.buttonTxt) {
      this.buttonTxt = data.buttonTxt;
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

    if (this.data.afterClosedCallBackRedirect) {
      this.data.afterClosedCallBackRedirect.closeAndRedirect(this.data.url, this.data.didWin);
    }
  }
}
