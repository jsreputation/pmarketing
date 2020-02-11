import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, switchMap, filter, catchError, takeUntil, tap } from 'rxjs/operators';
import { from, of, combineLatest, Observable, throwError, Subject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { SettingsService, PagesObject, AccountPageObject } from '@perx/core';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  public content$: Observable<string>;
  public error$: Subject<boolean> = new Subject<boolean>();
  private destroy$: Subject<any> = new Subject();
  constructor(private settingsService: SettingsService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    let key = null;
    const obs: Observable<string> = this.route.params
      .pipe(
        filter((params: Params) => params.key),
        map((params: Params) => params.key),
        tap(k => key = k),
        switchMap(k => combineLatest(of(k), this.settingsService.getAccountSettings())),
        map(([k, settings]: [string, PagesObject]) => settings.pages.find(s => s.key === k)),
        map((page: AccountPageObject) => page.content_url),
        switchMap(url => fetch(url)),
        switchMap(stuff => from(stuff.text())),
        catchError((err) => {
          this.error$.next(true);
          return throwError(new Error(`${oc(err).message('Could not find/fetch content')} ${key}`));
        })
      );
    //NL done in 2 steps to avoid having the compiler on our back
    this.content$ = obs.pipe(takeUntil(this.destroy$));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
