import { Component, OnInit, ChangeDetectionStrategy, Inject, DoCheck, ChangeDetectorRef, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-add-loyalty-popup',
  templateUrl: './add-loyalty-popup.component.html',
  styleUrls: ['./add-loyalty-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLoyaltyPopupComponent implements OnInit, DoCheck {
  public newDate: FormControl = new FormControl(null);

  constructor(public dialogRef: MatDialogRef<AddLoyaltyPopupComponent>,
              private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public save(): void {
    this.dialogRef.close(this.newDate.value);
  }

  public ngOnInit(): void {
  }

  public ngDoCheck(): void {
    this.cd.detectChanges();
  }

}
