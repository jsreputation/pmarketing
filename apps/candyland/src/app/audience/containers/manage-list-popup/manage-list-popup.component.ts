import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'cl-manage-list-popup',
  templateUrl: './manage-list-popup.component.html',
  styleUrls: ['./manage-list-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageListPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ManageListPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public close() {
    this.dialogRef.close(null);
  }

  public save() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
