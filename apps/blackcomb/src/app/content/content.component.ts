import { Component, OnInit } from '@angular/core';
import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { from, of, combineLatest, Observable, throwError } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ThemesService } from '@perx/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public content$: Observable<any>;
  public isLoading: boolean = true;
  public errorFlag: boolean = false;
  constructor(private themeService: ThemesService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.content$ = this.route.params
      .pipe(
        filter((params: Params) => params.key),
        map((params: Params) => params.key),
        switchMap(key => combineLatest(of(key), this.themeService.getAccountSettings())),
        map(([key, settings]: [string, any]) => settings.pages.find(s => s.key === key)),
        map((page: any) => page.content_url),
        catchError(err => throwError(err)),
        switchMap(url => fetch(url)),
        map(stuff => from(stuff.text())),
        switchMap(content => content)
      );

    this.content$.subscribe(
      () => this.isLoading = false,
      (_) => {
        this.errorFlag = true;
        this.isLoading = false;
      }
    );
  }
}
