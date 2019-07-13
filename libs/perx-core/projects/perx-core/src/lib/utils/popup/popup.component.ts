import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface IPopupConfig {
  title?: string;
  text?: string;
  buttonTxt?: string;
  image?: string;
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
  buttonTxt = 'close';
  image: string = null;

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
    if (data.image) {
      this.image = data.image;
    }
  }
}
