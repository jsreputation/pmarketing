import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IPopupConfig {
  title?: string;
  text?: string;
  imageUrl?: string;
  buttonTxt?: string | null;
  afterClosedCallBack?: PopUpClosedCallBack;
  disableOverlayClose?: boolean;
  buttonTxt2?: string | null;
  hideButton?: boolean;
  panelClass?: string[] | string;
  ctaButtonClass?: string;
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
  public title: string | null = null;
  public text: string | null = null;
  public imageUrl: string | null = null;
  public showButton: boolean = true;
  public buttonTxt: string | null = 'close';
  public buttonTxt2: string | null = null;
  public ctaButtonClass: string = '';

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPopupConfig,
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
    if (data.buttonTxt2) {
      this.buttonTxt2 = data.buttonTxt2;
    }

    // can only be true if explicitly passed then we change the default showButton which is true
    if (data.hideButton) {
      this.showButton = false;
    }

    if (data.ctaButtonClass) {
      this.ctaButtonClass = data.ctaButtonClass;
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

  public buttonPressed2(): void {
    this.dialogRef.close(false);
    if (this.data.afterClosedCallBack) {
      this.data.afterClosedCallBack.dialogClosed();
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
