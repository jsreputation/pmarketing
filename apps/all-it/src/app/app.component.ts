import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
} from '@angular/material';
import {
  Router,
  NavigationEnd,
  Event,
} from '@angular/router';
import { Location } from '@angular/common';

import {
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import {
  PopupComponent,
  NotificationService,
  IPopupConfig,
  ITheme,
  ConfigService,
  IConfig,
  ThemesService,
} from '@perxtech/core';
import {
  HomeComponent,
  HistoryComponent,
  AccountComponent,
  SignIn2Component,
  WalletComponent,
} from '@perxtech/blackcomb-pages';

import { BACK_ARROW_URLS } from './app.constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  public showHeader: boolean;
  public showToolbar: boolean;
  public backArrowIcon: string = '';
  public preAuth: boolean;
  public theme: ITheme;
  public translationLoaded: boolean = false;

  private initBackArrow(url: string): void {
    this.backArrowIcon = BACK_ARROW_URLS.some(test => url.startsWith(test)) ? 'arrow_backward' : '';
  }

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private config: ConfigService,
    private themesService: ThemesService,
    private titleService: Title,
  ) {
  }

  public ngOnInit(): void {
    this.config.readAppConfig<ITheme>()
      .pipe(
        tap((config: IConfig<ITheme>) => {
          if(config.appVersion){
            (window as any).PERX_APP_VERSION = config.appVersion;
          }
        }),
        switchMap((conf) => this.translate.getTranslation(conf.defaultLang as string)),
        tap((config: IConfig<ITheme>) => {
          this.translationLoaded = true;
          this.preAuth = config.preAuth as boolean;
        }),
        switchMap((config: IConfig<ITheme>) => this.themesService.getThemeSetting(config))
      )
      .subscribe((res: ITheme) => {
        const title: string = res.properties['--title'] ? res.properties['--title'] : 'All IT';
        this.titleService.setTitle(title);
      });

    this.notificationService.$popup
      .subscribe((data: IPopupConfig) => this.dialog.open(PopupComponent, { data }));
    this.notificationService.$snack
      .subscribe(
        (msg: string) => {
          if (msg === 'LOGIN_SESSION_EXPIRED') {
            this.router.navigate([ '/login' ]);
            msg = 'Login Session Expired';
          }
          this.snackBar.open(msg, 'x', { duration: 2000 });
        },
        (err) => console.error(err)
      );
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe(url => this.initBackArrow(url));
    this.initBackArrow(this.router.url);
  }

  public onActivate(ref: any): void {
    this.showHeader = ! (ref instanceof SignIn2Component);
    this.showToolbar = ref instanceof HomeComponent ||
      ref instanceof HistoryComponent ||
      ref instanceof AccountComponent ||
      ref instanceof WalletComponent;
    this.cd.detectChanges();
  }

  public backArrowClick(): void {
    if (this.backArrowIcon !== '') {
      this.location.back();
    }
  }
}
