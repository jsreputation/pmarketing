import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, iif, of } from 'rxjs';
import {  filter, map, switchMap, tap } from 'rxjs/operators';
import {
  AuthenticationService,
  ConfigService, IConfig, IPopupConfig,
  ITheme,
  NotificationService, PopupComponent,
  ThemesService,
  TokenStorage
} from '@perxtech/core';
import { MatDialog } from '@angular/material/dialog';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

interface IBdoConfig {
  pi: string;
}

@Component({
  selector: 'bdo-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
  title = 'bdo';
  $loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public preAuth: boolean;
  public translationLoaded = false;
  public showFooter = false;

  constructor(
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router,
    private snack: MatSnackBar,
    private config: ConfigService,
    private translate: TranslateService,
    private themesService: ThemesService,
    private titleService: Title,
    private storage: TokenStorage,
  ) {
  }

  public ngOnInit(): void {
    // to store so that it works with interceptor
    this.translate.onLangChange.pipe(
      // tap((change: LangChangeEvent) => console.info(change, 'a lang change occured')),
      tap((change: LangChangeEvent) => this.storage.setAppInfoProperty(change.lang, 'lang')),
    ).subscribe();
    this.config.readAppConfig<IBdoConfig>().pipe(
      tap((config: IConfig<IBdoConfig>) => {
        if (config.appVersion) {
          (window as any).PERX_APP_VERSION = config.appVersion;
        }
        this.preAuth = config.preAuth as boolean;
        // sets the identifier if app module has already picked it up
        this.storage.setAppInfoProperty(config.custom.pi, 'identifier');
        (window as any).primaryIdentifier = config.custom.pi;

      }),
      switchMap(() => this.config.readAppConfig<ITheme>()), // typecast to theme
      tap((conf) => {
        this.storage.setAppInfoProperty(conf.defaultLang, 'lang');
      }),
      // any avail languages needs to be 'gotten' first for lang toggle after to be responsive
      tap(() => {
          // getTranslation fetches the translation and registers the language
          // for when default lang is not 'en'
          // only after fetching the translations do you .use() it
          this.translate.getTranslation('en');
          // this.translate.getLangs() to get langs avail, in future pass array of langs
          // loop thru each lang string and .getTranslation it
          this.translationLoaded = true;
        }
      ),
      switchMap((config: IConfig<ITheme>) => this.themesService.getThemeSetting(config))
    )
    .subscribe((res: ITheme) => {
      const title: string = res.properties['--title'] ? res.properties['--title'] : '\u00A0';
      this.titleService.setTitle(title);
      this.authenticate();
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
            this.router.navigate([ '/login' ]);
            console.log('session expired detected');
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
      .subscribe(url => this.initFooter(url));
  }

  private initFooter(url: string): void {
    this.showFooter = !url.match(/(treat-enroll)|(treat-welcome)\/\d+$/gi); // returns null if no match, array if there is.
  }

  private authenticate(): void {
    if (this.preAuth) {
      this.authenticationService.isAuthorized().pipe(
        switchMap((isAuthed: boolean) =>
          iif(
            () => isAuthed && !(window as any).primaryIdentifier,
            of({}),
            this.authenticationService.autoLogin()
          ))
      ).subscribe(
        () => {
          this.$loading.next(true);
        },
      (err) => of(err)
      );
    } else { // don't need to perform auto login
      this.$loading.next(true);
    }
  }
}
