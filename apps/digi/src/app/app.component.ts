import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService, TokenStorage, NotificationService, IPopupConfig, PopupComponent } from '@perx/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public preAuth: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
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

    if (this.preAuth) {
      if (isPlatformBrowser(this.platformId)) {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          const param: string = location.search;
          const searchParams: URLSearchParams = new URLSearchParams(param);
          const token: string | null = searchParams.get('token');
          if (token) {
            this.tokenStorage.setAccessToken(token);
          }
          (window as any).primaryIdentifier = searchParams.get('pi');

        }
      }
    }
    this.authService.failedAuthObservable.subscribe(
      (didFailAuth: boolean) => {
        if (didFailAuth) {
          const payload: string = btoa(JSON.stringify({ code: 401, message: 'Unauthorized' }));
          this.router.navigate([`/result`], { queryParams: { payload } });
        }
      }
    );
  }
}
