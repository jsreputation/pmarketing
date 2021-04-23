import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { NotificationService, PopupComponent } from '@perxtech/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private translate: TranslateService
  ) {
  }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });

    this.notificationService.$snack.subscribe((data) => {
      if (data === 'LOGIN_SESSION_EXPIRED') {
        this.router.navigate(['/login']);
        this.translate.get('LOGIN_SESSION_EXPIRED').subscribe(
          txt =>
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: {
                message: txt
              }
            })
        );
      } else {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: {
            message: data
          }
        });
      }
    });
  }
}
