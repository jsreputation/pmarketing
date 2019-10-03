import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'cl-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  public close(data?: boolean): void {
    this.dialogRef.close(data);
  }
}
