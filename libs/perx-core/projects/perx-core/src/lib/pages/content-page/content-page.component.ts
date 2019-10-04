import { Component, OnInit } from '@angular/core';
import { Observable, of, from, combineLatest } from 'rxjs';
import { ThemesService } from '../../utils/themes/themes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'perx-core-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit {
  public content$: Observable<any>;
  constructor(private themeService: ThemesService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.content$ = this.route.params
      .pipe(
        filter((params: Params) => params.key),
        map((params: Params) => params.key),
        switchMap(key => combineLatest(of(key), this.themeService.getAccountSettings())),
        map(([key, settings]: [string, any]) => settings.pages.find(s => s.key === key)),
        map((page: any) => page.content_url),
        switchMap(url => fetch(url)),
        map(stuff => from(stuff.text())),
        switchMap(content => content)
      );
  }

}
