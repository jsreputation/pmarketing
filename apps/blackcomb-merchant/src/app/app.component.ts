import { Component, OnInit } from '@angular/core';
import { ConfigService, IConfig, ThemesService, ITheme, NotificationService } from '@perxtech/core';
import { MerchantTransactionHistoryComponent, MerchantRedeemComponent, MerchantQrscannerComponent, MerchantOrderComponent } from '@perxtech/bcm-pages';
import {
  switchMap,
  tap,
  filter,
  map
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EXTENDED_LOGO_URLS } from './app.constants';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public theme: ITheme;
  public backgroundUrl: string;
  public subtitle: string;
  public isStandardLogoMode: boolean = false;
  public showPageTitle: boolean = false;
  public pageTitle: string = '';


  constructor(
    private configService: ConfigService,
    private themesService: ThemesService,
    private notificationService: NotificationService,
    private snack: MatSnackBar,
    private router: Router,
    private location: Location,
    private translateService: TranslateService,
  ) {
  }

  public ngOnInit(): void {

    this.configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => {
        if (config.appVersion) {
          (window as any).PERX_APP_VERSION = config.appVersion;
        }
      }),
      switchMap(() => this.themesService.getThemeSetting())).subscribe(
        (theme) => {
          this.theme = theme;
          this.backgroundUrl = this.theme.properties['--background_image'] ? this.theme.properties['--background_image'] : 'assets/background_image.png';
          this.subtitle = this.theme.properties['--subtitle'] ? this.theme.properties['--subtitle'] : 'In-Store Loyalty Program';
    });

    this.notificationService.$snack.subscribe((message: string) => {
      if (message === 'LOGIN_SESSION_EXPIRED') {
        this.router.navigate([ '/login' ]);
        this.translateService.get('LOGIN_SESSION_EXPIRED').subscribe(msg => {
          this.snack.open(msg, 'x', { duration: 2000, panelClass: ['custom-snackbar']} );
        });
      } else {
        this.snack.open(message, 'x', { duration: 2000, panelClass: ['custom-snackbar']});
      }
    });

    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      ).subscribe(url => {
        this.initLogoMode(url);
    });
  }

  public onActivate(ref: any): void {

    this.showPageTitle =
      ref instanceof MerchantTransactionHistoryComponent ||
      ref instanceof MerchantQrscannerComponent ||
      ref instanceof MerchantRedeemComponent ||
      ref instanceof MerchantOrderComponent;

    this.pageTitle =
      ref instanceof MerchantTransactionHistoryComponent
        ? 'Transaction History'
        : ref instanceof MerchantQrscannerComponent
        ? 'Scan QR'
        : ref instanceof MerchantRedeemComponent
        ? 'Redemption'
        : ref instanceof MerchantOrderComponent
        ? 'Create Sales Record'
        : '';
  }

  private initLogoMode(url: string): void {
    this.isStandardLogoMode = EXTENDED_LOGO_URLS.some(val => url.startsWith(val)) ? false : true;
  }

  public backArrowClick(): void {
    this.location.back();
  }

}
