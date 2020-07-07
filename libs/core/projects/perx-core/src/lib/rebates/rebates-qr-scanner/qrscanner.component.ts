import { Observable, of } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'perx-core-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
export class QrScannerComponent implements OnInit {

  @Input()
  public merchantTextFn: () => Observable<string>;

  constructor(
    public dialogRef: MatDialogRef<QrScannerComponent>,
  ) { }

  public ngOnInit():void {
    if (!this.merchantTextFn) {
      this.merchantTextFn = () => of('Capture the Merchant\’s QR Code in the frame below');
    }
  }
  public scanSuccessHandler(data: string): void {
    if ( !data ) {
      return;
    }
    this.dialogRef.close({data});
  }

}
