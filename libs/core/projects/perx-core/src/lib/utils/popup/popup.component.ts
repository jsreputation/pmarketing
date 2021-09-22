import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  hideCloseButton?: boolean;
  titleBelowImage?: boolean;
  popupClass?: string;
}
type OnOkFn = () => void;
export interface PopUpClosedCallBack {
  dialogClosed(): void;
  onOkFn?: OnOkFn;
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
  public titleBelowImage: boolean = false;
  public text: string | null = null;
  public imageUrl: string | null = null;
  public showButton: boolean = true;
  public hideCloseButton: boolean = false;
  public buttonTxt: string | null = 'close';
  public buttonTxt2: string | null = null;
  public ctaButtonClass: string = '';
  public popupClass: string = ''; // currently we have `.custom-popup-class`

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

    if (data.hideCloseButton) {
      this.hideCloseButton = true;
    }

    if (data.titleBelowImage) {
      this.titleBelowImage = true;
    }

    if (data.popupClass) {
      this.popupClass = data.popupClass;
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
    if (this.data?.afterClosedCallBack?.onOkFn) {
      this.data.afterClosedCallBack.onOkFn();
    }
  }

  public buttonPressed2(): void {
    this.dialogRef.close(false);
  }

  public onClose(): void {
    this.dialogRef.close();
    if (this.data.afterClosedCallBack) {
      this.data.afterClosedCallBack.dialogClosed();
    }
  }
}
