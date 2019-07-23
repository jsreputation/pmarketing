import { Component, OnInit, ChangeDetectionStrategy, Inject, DoCheck, ChangeDetectorRef, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-change-expiry-date-popup',
  templateUrl: './change-expiry-date-popup.component.html',
  styleUrls: ['./change-expiry-date-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeExpiryDatePopupComponent implements OnInit, DoCheck {
  public newDate = new FormControl(null);

  constructor(public dialogRef: MatDialogRef<ChangeExpiryDatePopupComponent>,
              private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public close() {
    this.dialogRef.close(null);
  }

  public save() {
    this.dialogRef.close(this.newDate.value);
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.cd.detectChanges();
  }

}
