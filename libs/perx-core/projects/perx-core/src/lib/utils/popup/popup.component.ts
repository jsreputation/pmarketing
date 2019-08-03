import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface IPopupConfig {
  title?: string;
  text?: string;
  imageUrl?: string;
  buttonTxt?: string|null;
  afterClosedCallBack?: PopUpClosedCallBack;
  disableOverlayClose?: boolean;
}

export interface PopUpClosedCallBack {
  dialogClosed(): void;
}

/**
 * Generic Popup content to be used like this: https://material.angular.io/components/dialog/overview
 */
@Component({
  selector: 'perx-core-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  public title: string = null;
  public text: string = null;
  public imageUrl: string = null;
  public buttonTxt: string = 'close';
  public image: string = null;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPopupConfig
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
    if (data.buttonTxt !== undefined) {
      this.buttonTxt = data.buttonTxt;
    }
    if (data.imageUrl) {
      this.imageUrl = data.imageUrl;
    }
  }

  @HostListener('window:keyup.esc')
  public onKeyUp(): void {
    this.dialogRef.close();
  }

  public buttonPressed(): void {
    if (this.data.afterClosedCallBack) {
      this.data.afterClosedCallBack.dialogClosed();
    }
  }
}
