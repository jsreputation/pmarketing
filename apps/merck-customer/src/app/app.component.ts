import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ConfigService, IConfig, ITheme, NotificationService, ThemesService, TokenStorage, } from '@perxtech/core';
import { BarSelectedItem, PageAppearence, PageProperties } from './page-properties';
import { isPlatformBrowser, Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs/operators';

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
  public theme: ITheme;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private location: Location,
    private configService: ConfigService,
    private translateService: TranslateService,
    private store: TokenStorage,
    private themesService: ThemesService,
  ) {
    this.notificationService.$snack.subscribe((message: string) => {
      if (message === 'LOGIN_SESSION_EXPIRED') {
        this.router.navigate([ '/login' ]);
        this.translateService.get('LOGIN_SESSION_EXPIRED').subscribe(txt => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: txt,
              icon: 'clear',
            },
            duration: 4000,
          });
        });
      } else {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message,
            icon: 'clear',
          },
          duration: 4000,
        });
      }
    });
  }

  public ngOnInit(): void {
    const lang = this.store.getAppInfoProperty('merck-customer') || this.translateService.currentLang || this.translateService.defaultLang;
    this.translateService.use(lang);
    this.translateService.onLangChange.subscribe((change: LangChangeEvent) => {
      this.store.setAppInfoProperty(change.lang, 'merck-customer');
      this.translateService.getTranslation(change.lang);
    });
    this.configService.readAppConfig<ITheme>().pipe(
      tap((config: IConfig<ITheme>) => {
        this.preAuth = config.preAuth as boolean;
        if (config.appVersion) {
          (window as any).PERX_APP_VERSION = config.appVersion;
        }
      }),
      switchMap((config: IConfig<ITheme>) => this.themesService.getThemeSetting(config))
    ).subscribe((theme) => {
      this.theme = theme;
    });
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

    if (typeof activeComponent.getPageProperties === 'function') {
      this.pageProperties = activeComponent.getPageProperties();
    } else {
      this.pageProperties = {
        header: true,
        backButtonEnabled: true,
        bottomSelectedItem: BarSelectedItem.NONE,
        pageTitle: ''
      };
    }
    this.leftIconToShow = this.pageProperties.backButtonEnabled ? 'arrow_backward' : '';
  }

  public onLeftActionClick(): void {
    this.location.back();
  }

  public onTabNavigate(path: string): void {
    this.router.navigate([path]);
  }
}

