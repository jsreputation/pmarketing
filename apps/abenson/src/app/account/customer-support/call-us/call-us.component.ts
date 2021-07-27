import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPopupConfig } from '@perxtech/core';

@Component({
  selector: 'app-call-us',
  templateUrl: './call-us.component.html',
  styleUrls: ['./call-us.component.scss']
})
export class CallUsComponent {
  public showButton: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<CallUsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPopupConfig,
  ) {
    if (data.disableOverlayClose) {
      dialogRef.disableClose = data.disableOverlayClose;
    }

    if (data.hideButton) {
      this.showButton = false;
    }
  }

  public back(): void {
    this.dialogRef.close(false);
  }

}
