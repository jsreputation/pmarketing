import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { NotificationService } from '@perxtech/core';
import { MatSnackBar } from '@angular/material';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'merck-merchant';

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {
    this.notificationService.$snack.subscribe((message: string) => {
      if (message === 'LOGIN_SESSION_EXPIRED') {
        this.router.navigate(['/login']);
        this.translate.get('LOGIN_SESSION_EXPIRED').subscribe(
          txt => this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              txt,
              icon: 'clear',
            },
            duration: 4000,
          })
        );
      }
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          message,
          icon: 'clear',
        },
        duration: 4000,
      });
    });
  }
}
