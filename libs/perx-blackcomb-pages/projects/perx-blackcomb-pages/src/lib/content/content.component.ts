import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, switchMap, filter, catchError, takeUntil } from 'rxjs/operators';
import { from, of, combineLatest, Observable, throwError, Subject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { SettingsService } from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  public content$: Observable<any>;
  public isLoading: boolean = true;
  public errorFlag: boolean = false;
  private destroy$: Subject<any> = new Subject();
  constructor(private settingsService: SettingsService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.content$ = this.route.params
      .pipe(
        filter((params: Params) => params.key),
        map((params: Params) => params.key),
        switchMap(key => combineLatest(of(key), this.settingsService.getAccountSettings())),
        map(([key, settings]: [string, any]) => settings.pages.find(s => s.key === key)),
        map((page: any) => page.content_url),
        catchError(err => throwError(err)),
        switchMap(url => fetch(url)),
        map(stuff => from(stuff.text())),
        switchMap(content => content),
        takeUntil(this.destroy$)
      );

    this.content$.subscribe(
      () => this.isLoading = false,
      () => {
        this.errorFlag = true;
        this.isLoading = false;
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
