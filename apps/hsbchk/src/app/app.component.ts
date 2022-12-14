import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  ConfigService,
  IConfig,
} from '@perxtech/core';
import {
  HomeComponent,
  HistoryComponent,
  AccountComponent,
  SignIn2Component,
  WalletComponent
} from '@perxtech/blackcomb-pages';

import { BACK_ARROW_URLS } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showHeader: boolean;
  public showToolbar: boolean;
  public backArrowIcon: string = '';
  public preAuth: boolean;
  public translationLoaded: boolean = false;

  private initBackArrow(url: string): void {
    this.backArrowIcon = BACK_ARROW_URLS.some(test => url.startsWith(test)) ? 'arrow_backward' : '';
  }

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private cd: ChangeDetectorRef,
    private snack: MatSnackBar,
    private config: ConfigService,
    private translate: TranslateService
  ) {
  }

  public ngOnInit(): void {
    this.config.readAppConfig()
      .pipe(
        tap((config: IConfig<void>) => {
          if (config.appVersion) {
            (window as any).PERX_APP_VERSION = config.appVersion;
          }
        }),
        switchMap((conf) => this.translate.getTranslation(conf.defaultLang as string)))
      .subscribe((config: IConfig<void>) => {
        this.translationLoaded = true;
        this.preAuth = config.preAuth as boolean;
      });

    this.notificationService.$popup
      .subscribe(
        (data: IPopupConfig) => this.dialog.open(PopupComponent, { data }),
        (err) => console.error(err)
      );
    this.notificationService.$snack
      .subscribe(
        (msg: string) => {
          if (msg === 'LOGIN_SESSION_EXPIRED') {
            this.router.navigate(['/login']);
            this.translate.get('LOGIN_SESSION_EXPIRED').subscribe(txt => this.snack.open(txt, 'x', { duration: 2000 }));
          } else {
            this.snack.open(msg, 'x', { duration: 2000 });
          }
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
    this.showHeader = !(ref instanceof SignIn2Component);
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
