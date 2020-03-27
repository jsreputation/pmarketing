import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccountPageObject, ITheme, PagesObject, SettingsService, ThemesService } from '@perxtech/core';
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

  constructor(
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private themeService: ThemesService,
    private location: Location,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.content$ = this.route.params
      .pipe(
        filter((params: Params) => params.key),
        map((params: Params) => params.key),
        switchMap(k => combineLatest(of(k), this.settingsService.getAccountSettings())),
        map(([k, settings]: [string, PagesObject]) => settings.pages.find(s => s.key === k)),
        map((page: AccountPageObject) => page.content_url),
        switchMap((url) => this.http.get(`https://cors-proxy.perxtech.io/?url=${url}`, { responseType: 'text' })),
        catchError(() => {
          this.error$.next(true);
          return of(void 0);
        }),
        takeUntil(this.destroy$)
      );

    this.themeService.getThemeSetting().subscribe(theme => this.theme = theme)
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
