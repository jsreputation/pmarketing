import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService, NotificationService, PopupComponent, ConfigService, IConfig } from '@perxtech/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'components-demo';
  public preAuth: boolean;

  constructor(
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.preAuth = config.preAuth as boolean;
      }
    );

    // initialise notification service
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });

    if (this.preAuth && isPlatformBrowser(this.platformId) && !((window as any).primaryIdentifier)) {
      const param = location.search;
      (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
    }
  }

  public get loggedIn(): boolean {
    // todo
    return false;
  }

  public logout(): void {
    this.authService.logout();
  }
}
