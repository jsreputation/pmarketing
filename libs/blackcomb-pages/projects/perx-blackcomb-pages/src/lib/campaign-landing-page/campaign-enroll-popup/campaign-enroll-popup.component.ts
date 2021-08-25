import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ICampaignEnrollPopupConfig {
  title?: string;
  description?: string;
  buttonTxt?: string | null;
  afterClosedCallBack?: CampaignEnrollPopUpClosedCallBack;
  disableOverlayClose?: boolean;
}

export interface CampaignEnrollPopUpClosedCallBack {
  dialogClosed(): void;
}

@Component({
  selector: 'perx-core-campaign-enroll-popup',
  templateUrl: './campaign-enroll-popup.component.html',
  styleUrls: ['./campaign-enroll-popup.component.scss']
})
export class CampaignEnrollPopupComponent {
  public title: string | null = null;
  public description: string | null = null;
  public buttonTxt: string | null = 'Ok';
  public showButton: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CampaignEnrollPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICampaignEnrollPopupConfig
  ) {
    if (data.disableOverlayClose) {
      dialogRef.disableClose = data.disableOverlayClose;
    }
    if (data.title) {
      this.title = data.title;
    }
    if (data.buttonTxt !== undefined) {
      this.buttonTxt = data.buttonTxt;
    }
    if (data.description) {
      this.description = data.description;
    }
  }

  // todo: only set up host listener if disableOverlayClose = true
  @HostListener('window:keyup.esc')
  public onKeyUp(): void {
    this.dialogRef.close(false);
  }

  public buttonPressed(btnTxt1?: string | null): void {
    this.dialogRef.close(btnTxt1);
    if (this.data.afterClosedCallBack) {
      this.data.afterClosedCallBack.dialogClosed();
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
