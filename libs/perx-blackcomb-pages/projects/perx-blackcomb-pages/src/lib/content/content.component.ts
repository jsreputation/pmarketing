import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, switchMap, filter, catchError, takeUntil } from 'rxjs/operators';
import {
  of,
  combineLatest,
  Observable,
  Subject,
} from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { SettingsService, PagesObject, AccountPageObject } from '@perxtech/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'perx-blackcomb-pages-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  public content$: Observable<string | void>;
  public error$: Subject<boolean> = new Subject<boolean>();
  private destroy$: Subject<any> = new Subject();
  constructor(
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private http: HttpClient
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
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
