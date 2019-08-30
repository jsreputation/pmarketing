import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupComponent, NotificationService, AuthenticationService } from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'bpi';

  constructor(
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });

    this.authService.$failedAuth.subscribe(
      (didFailAuth: boolean) => {
        if (didFailAuth) {
          this.router.navigateByUrl('login');
        }
      }
    );
  }
}
