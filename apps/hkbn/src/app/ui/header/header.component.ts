import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, mapTo, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthenticationService } from '@perx/core';

@Component({
  selector: 'hkbn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public routeData: any = null;

  private currentRoute: ActivatedRoute;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {

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
      tap((route) => this.currentRoute = route),
      switchMap((route: ActivatedRoute) => route.data),
      takeUntil(this.destroy$)
    ).subscribe((routeData) => {
      this.routeData = routeData;
    });
  }

  public goBack(): void {
    if (this.routeData && (this.routeData.back || this.routeData.cross)) {
      const url = this.routeData.backUrl ? this.routeData.backUrl : '';
      this.router.navigate([url], {relativeTo: this.currentRoute});
    }
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
