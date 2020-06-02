import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'perx-core-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
export class QrScannerComponent {

  constructor(
    public dialogRef: MatDialogRef<QrScannerComponent>,
  ) { }

  public scanSuccessHandler(data: string): void {
    if ( !data ) {
      return;
    }
    this.dialogRef.close({data});
  }

}
