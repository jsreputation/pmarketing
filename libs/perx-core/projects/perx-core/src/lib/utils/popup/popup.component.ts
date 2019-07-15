import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface IPopupConfig {
  title?: string;
  text?: string;
  imageUrl?: string;
  buttonTxt?: string;
  afterClosedCallBack?: PopUpClosedCallBack;
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
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  title: string = null;
  text: string = null;
  imageUrl: string = null;
  buttonTxt = 'close';

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPopupConfig
  ) {
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
  }

  popUpClosed() {
    this.data.afterClosedCallBack.dialogClosed();
  }
}
