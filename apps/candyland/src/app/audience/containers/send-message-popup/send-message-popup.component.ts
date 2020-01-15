import { Component, OnInit, ChangeDetectorRef, Inject, DoCheck } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChangeExpiryDatePopupComponent } from '../change-expiry-date-popup/change-expiry-date-popup.component';

@Component({
  selector: 'cl-send-message-popup',
  templateUrl: './send-message-popup.component.html',
  styleUrls: ['./send-message-popup.component.scss']
})
export class SendMessagePopupComponent implements OnInit, DoCheck {
  public message: FormControl = new FormControl(null);

  constructor(
    public dialogRef: MatDialogRef<ChangeExpiryDatePopupComponent>,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public save(): void {
    this.dialogRef.close(this.message.value);
  }

  public ngOnInit(): void {
  }

  public ngDoCheck(): void {
    this.cd.detectChanges();
  }
}
