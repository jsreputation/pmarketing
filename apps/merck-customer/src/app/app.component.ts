import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NotificationService, IConfig, ConfigService, TokenStorage } from '@perxtech/core';
import {
  PageProperties,
  BarSelectedItem,
  PageAppearence
} from './page-properties';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { Location } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public leftIconToShow: string = '';
  public rightIconToShow: string = '';

  // Default Values
  public pageProperties: PageProperties = {
    header: false,
    backButtonEnabled: false,
    bottomSelectedItem: BarSelectedItem.HOME,
    pageTitle: ''
  };

  private preAuth: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private location: Location,
    private configService: ConfigService,
    private translateService: TranslateService,
    private store: TokenStorage
  ) {
    this.notificationService.$snack.subscribe((message: string) => {
      if (message.includes('Session Expired')) {
        this.router.navigate(['/login']);
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

  public ngOnInit(): void {

    const lang = this.store.getAppInfoProperty('merck-customer') || this.translateService.currentLang || this.translateService.defaultLang;
    this.translateService.use(lang);
    this.translateService.onLangChange.subscribe((change: LangChangeEvent) => {
      this.store.setAppInfoProperty(change.lang, 'merck-customer');
    });
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.preAuth = config.preAuth as boolean;
      }
    );
    if (!this.preAuth) {
      return;
    }

    if (isPlatformBrowser(this.platformId) && !((window as any).primaryIdentifier)) {
      const param = location.search;
      (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
    }
  }

  public onActivate(ref: any): void {
    const activeComponent = ref as PageAppearence;
    this.pageProperties = activeComponent.getPageProperties();
    this.leftIconToShow = this.pageProperties.backButtonEnabled ? 'arrow_back_ios' : '';
  }

  public onLeftActionClick(): void {
    this.location.back();
  }

  public onTabNavigate(path: string): void {
    this.router.navigate([path]);
  }
}
