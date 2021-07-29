import { Observable, of } from 'rxjs';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPopupConfig } from '../../utils/popup/popup.component';

@Component({
  selector: 'perx-core-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
export class QrScannerComponent implements OnInit {

  public showButton: boolean = true;
  @Input()
  public merchantTextFn: () => Observable<string>;

  constructor(
    public dialogRef: MatDialogRef<QrScannerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPopupConfig,
  ) {
    if (data?.disableOverlayClose) {
      dialogRef.disableClose = data.disableOverlayClose;
    }

    if (data?.hideButton) {
      this.showButton = false;
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    if (!this.merchantTextFn) {
      this.merchantTextFn = () => of('Capture the Merchant\’s QR Code in the frame below');
    }
  }
  public scanSuccessHandler(data: string): void {
    if (!data) {
      return;
    }
    this.dialogRef.close({ data });
  }

}
