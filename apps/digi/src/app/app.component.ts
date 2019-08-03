import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
// import { Router } from '@angular/router';
import { AuthenticationService, NotificationService, IPopupConfig, PopupComponent } from '@perx/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public preAuth: boolean;

  constructor(
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {
    this.preAuth = environment.preAuth;
  }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe(
      (data: IPopupConfig) => {
        this.dialog.open(PopupComponent, { data });
      }
    );

    if (isPlatformBrowser(this.platformId)) {
      // set global userID var for GA tracking
      if (!((window as any).primaryIdentifier)) {
        const param: string = location.search;
        const searchParams: URLSearchParams = new URLSearchParams(param);
        const token: string | null = searchParams.get('token');
        const pi: string | null = searchParams.get('pi');
        if (token && pi) {
          this.authService.saveUserAccessToken(token);
          localStorage.setItem('user-id', pi);

          (window as any).primaryIdentifier = searchParams.get('pi');
        } else {
          this.authService.getUserAccessToken()
            .subscribe((tok: string) => {
              if (tok === null) {
                this.notificationService.addPopup({
                  text: 'Missing authentication information'
                });
              }
            });
        }
      }
    }
  }
}
