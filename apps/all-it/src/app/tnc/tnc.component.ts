import { Component, OnInit } from '@angular/core';
import { ThemesService, ITheme } from '@perxtech/core';
import { BACK_ARROW_URLS } from '@perxtech/blackcomb-pages';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Event } from '@angular/router';
import {
  filter,
  map
} from 'rxjs/operators';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.scss']
})
export class TncComponent implements OnInit {

  public theme: ITheme;
  public backArrowIcon: string = '';

  private initBackArrow(url: string): void {
    this.backArrowIcon = BACK_ARROW_URLS.some(test => url.startsWith(test)) ? 'arrow_backward' : '';
  }

  constructor(
    private themesService: ThemesService,
    private location: Location,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe(theme => {
      this.theme = theme;
    });

    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe(url => this.initBackArrow(url));
    this.initBackArrow(this.router.url);
  }

  public backArrowClick(): void {
    if (this.backArrowIcon !== '') {
      this.location.back();
    }
  }

}
