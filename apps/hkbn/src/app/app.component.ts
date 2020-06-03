import { Component, OnInit } from '@angular/core';
import { NotificationService, PopupComponent } from '@perxtech/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SnackbarComponent } from './ui/snackbar/snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'hkbn';

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });

    this.notificationService.$snack.subscribe((data) => {
      if (data.includes('Session Expired')) {
        this.router.navigate(['/login']);
      }
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: {
          message: data
        }
      });
    });
  }
}
