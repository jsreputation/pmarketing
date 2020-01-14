import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService, NotificationService, IPopupConfig, PopupComponent, ConfigService, IConfig } from '@perx/core';
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
    private router: Router,
    private configService: ConfigService,
  ) {}

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.preAuth = config.preAuth as boolean;
      }
    );

    this.notificationService.$popup.subscribe(
      (data: IPopupConfig) => {
        this.dialog.open(PopupComponent, { data });
      }
    );

    if (isPlatformBrowser(this.platformId) && !((window as any).primaryIdentifier)) {
      // set global userID var for GA tracking
      const param: string = location.search;
      const searchParams: URLSearchParams = new URLSearchParams(param);
      const token: string | null = searchParams.get('token');
      const pi: string | null = searchParams.get('pi');

      if (pi) {
        (window as any).primaryIdentifier = pi;
        this.authService.logout();
        this.router.navigateByUrl('login');
      }

      if (token && pi) {
        this.authService.saveUserAccessToken(token);
        localStorage.setItem('user-id', pi);

        (window as any).primaryIdentifier = searchParams.get('pi');
      } else if (this.authService.getUserAccessToken() === null) {
        this.notificationService.addPopup({
          text: 'Missing authentication information'
        });
      }
    }
  }
}
