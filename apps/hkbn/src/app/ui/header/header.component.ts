import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, mapTo, startWith, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'hkbn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public routeData: any = null;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  public ngOnInit(): void {

    this.router.events.pipe(
      startWith(new NavigationEnd(0, '/', '/')),
      filter(event => event instanceof NavigationEnd),
      mapTo(this.route),
      map((route: ActivatedRoute) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
      switchMap((route: ActivatedRoute) => route.data),
      takeUntil(this.destroy$)
    ).subscribe((routeData) => {
      console.log(routeData);
      this.routeData = routeData;
    });
  }

  public goBack(): void {
    if (this.routeData && (this.routeData.back || this.routeData.cross)) {
      const url = this.routeData.backUrl ? this.routeData.backUrl : '';
      this.router.navigate([url]);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
