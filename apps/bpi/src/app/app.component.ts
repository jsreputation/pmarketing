import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupComponent, NotificationService, AuthenticationService, ConfigService, IConfig } from '@perx/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'bpi';
  public preAuth: boolean;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  public ngOnInit(): void {

    this.configService.readAppConfig().subscribe(
      (config: IConfig) => {
        this.preAuth = config.preAuth as boolean;
      }
    );

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

    if (this.preAuth && isPlatformBrowser(this.platformId) && !((window as any).primaryIdentifier)) {
      const param = location.search;
      (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
      if ((window as any).primaryIdentifier) {
        this.authService.logout();
        this.router.navigate(['']);
      }
    }
  }
}
