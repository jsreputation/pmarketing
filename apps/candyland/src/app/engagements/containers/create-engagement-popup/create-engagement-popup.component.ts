import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IEngagementType } from './engagement-type/models/engagement-type.model';

@Component({
  selector: 'cl-create-engagement-popup',
  templateUrl: './create-engagement-popup.component.html',
  styleUrls: ['./create-engagement-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEngagementPopupComponent implements OnInit {
  public selectedType: IEngagementType;
  constructor(
    public dialogRef: MatDialogRef<CreateEngagementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public setType(type: IEngagementType): void {
    this.selectedType = type;
  }
  ngOnInit() {
  }

}
