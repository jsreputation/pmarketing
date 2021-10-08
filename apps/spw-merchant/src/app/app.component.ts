import { Component, OnInit } from '@angular/core';
import { ConfigService, IConfig, ITheme, NotificationService, ThemesService, PopupComponent } from '@perxtech/core';
import {
  MerchantQrscannerComponent,
  MerchantRedeemComponent,
  MerchantTransactionHistoryComponent,
} from '@perxtech/bcm-pages';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EXTENDED_LOGO_URLS } from './app.constants';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IdentifyCustomerComponent } from './identify-customer/identify-customer.component';
import { ReserveOrderItemsComponent } from './sales-record/reserve-order-items/reserve-order-items.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecordComponent } from './sales-record/create-record/create-record.component';
import { SelectRecordTypeComponent } from './sales-record/select-record-type/select-record-type.component';
import { OrderSummaryComponent } from './sales-record/order-summary/order-summary.component';

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
  public goBackUrl: string = null;

  constructor(
    private configService: ConfigService,
    private themesService: ThemesService,
    private notificationService: NotificationService,
    private snack: MatSnackBar,
    private router: Router,
    private location: Location,
    private translateService: TranslateService,
    private dialog: MatDialog,
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

    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
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
      ref instanceof ReserveOrderItemsComponent ||
      ref instanceof IdentifyCustomerComponent ||
      ref instanceof CreateRecordComponent ||
      ref instanceof SelectRecordTypeComponent ||
      ref instanceof OrderSummaryComponent;

    this.pageTitle =
      ref instanceof MerchantTransactionHistoryComponent
        ? 'Transaction History'
        : ref instanceof MerchantQrscannerComponent
        ? 'Scan QR'
        : ref instanceof MerchantRedeemComponent
        ? 'Redemption'
        : ref instanceof ReserveOrderItemsComponent
        ? 'Create Sales Record'
        : ref instanceof IdentifyCustomerComponent
        ? 'Identify Customer'
        : ref instanceof CreateRecordComponent
        ? 'Create Sales Record'
        : '';

    this.goBackUrl = ref instanceof IdentifyCustomerComponent
      ? 'home'
      : ref instanceof SelectRecordTypeComponent
      ? 'home'
      : ref instanceof ReserveOrderItemsComponent
      ? 'select-record-type'
      : ref instanceof CreateRecordComponent
      ? 'reserve-order-items'
      : ref instanceof OrderSummaryComponent
      ? 'home'
      : null;
  }

  private initLogoMode(url: string): void {
    this.isStandardLogoMode = EXTENDED_LOGO_URLS.some(val => url.startsWith(val)) ? false : true;
  }

  public backArrowClick(): void {
    if (this.goBackUrl) {
      this.router.navigate([`${this.goBackUrl}`]);
    } else {
      this.location.back();
    }
  }

}
