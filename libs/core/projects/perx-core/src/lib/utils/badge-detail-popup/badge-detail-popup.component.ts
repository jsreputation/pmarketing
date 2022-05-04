import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IBadgeDetailPopupConfig {
  title?: string;
  description?: string;
  imageUrl?: string;
  buttonTxt?: string | null;
  afterClosedCallBack?: BadgeDetailPopUpClosedCallBack;
  disableOverlayClose?: boolean;
  active: boolean;
}

export interface BadgeDetailPopUpClosedCallBack {
  dialogClosed(): void;
}

@Component({
  selector: 'perx-core-badge-detail-popup',
  templateUrl: './badge-detail-popup.component.html',
  styleUrls: ['./badge-detail-popup.component.scss']
})
export class BadgeDetailPopupComponent {
  public title: string | null = null;
  public description: string | null = null;
  public imageUrl: string | null = null;
  public buttonTxt: string | null = 'close';
  public active: boolean;
  public showButton: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<BadgeDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBadgeDetailPopupConfig
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
    if (data.imageUrl) {
      this.imageUrl = data.imageUrl;
    }
    if (data.description) {
      this.description = data.description;
    }

    if (data.active) {
      this.active = data.active;
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
