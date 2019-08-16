import { Component, OnInit } from '@angular/core';
import { NotificationService, PopupComponent } from '@perx/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SnackbarComponent } from './ui/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'hkbn';

  constructor(private notificationService: NotificationService, private dialog: MatDialog, private snackbar: MatSnackBar) {
  }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, {data});
    });

    this.notificationService.$snack.subscribe((data) => {
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: {
          message: data
        }
      });
    });
  }
}
