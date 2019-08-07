import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'cl-new-campaign-done-popup',
  templateUrl: './new-campaign-done-popup.component.html',
  styleUrls: ['./new-campaign-done-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignDonePopupComponent  {

  constructor(public dialogRef: MatDialogRef<NewCampaignDonePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
