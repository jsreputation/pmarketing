import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'cl-manage-list-popup',
  templateUrl: './manage-list-popup.component.html',
  styleUrls: ['./manage-list-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageListPopupComponent {

  constructor(public dialogRef: MatDialogRef<ManageListPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public save(): void {
    this.dialogRef.close();
  }
}
