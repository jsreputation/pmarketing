import { Component, OnInit } from '@angular/core';
import { map, switchMap, filter } from 'rxjs/operators';
import { from, of, combineLatest, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ThemesService } from '@perx/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
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
