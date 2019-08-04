import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackBar: MatSnackBar) {
  }

  public ngOnInit(): void {
  }

  public dismissSnackbar(): void {
    this.snackBar.dismiss();
  }
}
