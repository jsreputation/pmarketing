import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'cl-create-engagement-popup',
  templateUrl: './create-engagement-popup.component.html',
  styleUrls: ['./create-engagement-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEngagementPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateEngagementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
