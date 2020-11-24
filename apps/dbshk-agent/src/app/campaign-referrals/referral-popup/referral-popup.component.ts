import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPopupConfig } from '@perxtech/core';

export interface IReferralPopupConfig extends IPopupConfig {
  description: string;
}
export interface TimerCallBack {
  timerExpired(): void;
  timerExpiring(): void;
}

export interface PopUpClosedCallBack {
  closeAndRedirect(url: string): void;
}

@Component({
  selector: 'perx-core-referral-popup',
  templateUrl: './referral-popup.component.html',
  styleUrls: ['./referral-popup.component.scss']
})
export class ReferralPopupComponent {

  public title: string;
  public description: string;
  public buttonTxt: string;
  public validTo: Date;

  constructor(
    public dialogRef: MatDialogRef<ReferralPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReferralPopupConfig
  ) {
    if (data.disableOverlayClose) {
      dialogRef.disableClose = data.disableOverlayClose;
    }
    if (data.title) {
      this.title = data.title;
    }
    if (data.description) {
      this.description = data.description;
    }
    if (data.buttonTxt) {
      this.buttonTxt = data.buttonTxt;
    }

  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public buttonPressed(): void {
    // debugger
    // this.dialogRef.close();
    // if (this.data.afterClosedCallBack) {
    //   this.data.afterClosedCallBack.dialogClosed();
    // }
    // if (this.data.afterClosedCallBackRedirect && this.data.url) {
    //   this.data.afterClosedCallBackRedirect.closeAndRedirect(this.data.url);
    // }
  }
}
