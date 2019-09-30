import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-call-us',
  templateUrl: './call-us.component.html',
  styleUrls: ['./call-us.component.scss']
})
export class CallUsComponent {

  constructor(
    private dialogRef: MatDialogRef<CallUsComponent>,
  ) {}

  public back(): void {
    this.dialogRef.close(false);
  }
}
