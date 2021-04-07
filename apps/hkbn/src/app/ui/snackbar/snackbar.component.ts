import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'hkbn-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  constructor(public snackBarRef: MatSnackBarRef<SnackbarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  public close(): void {
    this.snackBarRef.dismiss();
  }

}
