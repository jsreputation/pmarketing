import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AccountPageObject,
  FlagLocalStorageService,
  ITheme,
  PagesObject,
  SettingsService,
  ThemesService
} from '@perxtech/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  public content$: Observable<string | void>;
  public error$: Subject<boolean> = new Subject<boolean>();
  private destroy$: Subject<void> = new Subject();
  public theme: ITheme;
  public baseHref: string;
  public lang: string;
  public showHeader: boolean = false;

  constructor(
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private themeService: ThemesService,
    private location: Location,
    private router: Router,
    private translate: TranslateService,
    private flagLocalStorageService: FlagLocalStorageService
    // private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    // this.content$ = this.configService.readAppConfig().pipe(
    //   tap(config => this.baseHref = config.baseHref),
    //   switchMap(() => this.route.params),
    //   filter((params: Params) => params.key),
    //   map((params: Params) => params.key),
    //   switchMap(key => this.http.get(`${this.baseHref}assets/content/${key}.html`, { responseType: 'text' }).pipe(
    //     catchError(() => combineLatest(of(key), this.settingsService.getAccountSettings()).pipe(
    //       map(([k, settings]: [string, PagesObject]) => settings.pages.find(s => s.key === k)),
    //       map((page: AccountPageObject) => page.content_url),
    //       switchMap((url) => this.http.get(`https://cors-proxy.perxtech.io/?url=${url}`, { responseType: 'text' })),
    //     ))
    //   )),
    //   catchError(() => {
    //     this.error$.next(true);
    //     return of(void 0);
    //   }),
    //   takeUntil(this.destroy$)
    // );

    // default to 'en' to fetch normal links
    const currentLang = this.translate.currentLang || 'en';

    this.content$ = this.route.params
      .pipe(
        filter((params: Params) => params.key),
        map((params: Params) => params.key),
        switchMap(k => combineLatest(of(k), this.settingsService.getAccountSettings())),
        map(([k, settings]: [string, PagesObject]) => settings.pages.find(s => s.key === k)),
        map((page: AccountPageObject) => page.content_url),
        map((url: string) => currentLang === 'en' ? url : url.replace('.html', `-${currentLang}.html`)),
        // if we require a cors proxy we need to build it in the express server to avoid any CSP whitelist issues
        switchMap((url) => this.http.get(url, { responseType: 'text' })),
        catchError(() => {
          this.error$.next(true);
          return of(void 0);
        }),
        takeUntil(this.destroy$)
      );

    // todo: unify header bar in a more central location - currently in layout and content components
    combineLatest([
      this.route.queryParams,
      this.settingsService.getRemoteFlagsSettings()
    ]).subscribe(([params, flags]) => {
      const paramArr: string[] = params.flags && params.flags.split(',');
      const chromelessFlag: boolean = paramArr && paramArr.includes('chromeless') || !!flags.chromeless;

      if (chromelessFlag) {
        this.flagLocalStorageService.setFlagInLocalStorage('chromeless', 'true');
      } else if (params && params.flags === '') {
        this.flagLocalStorageService.resetFlagInLocalStorage('chromeless');
      }

      this.showHeader = !Boolean(this.flagLocalStorageService.getFlagInLocalStorage('chromeless'));
    });

    this.themeService.getThemeSetting().subscribe(theme => this.theme = theme);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goBack(): void {
    try {
      this.location.back();
    } catch {
      this.router.navigateByUrl('');
    }
  }
}
