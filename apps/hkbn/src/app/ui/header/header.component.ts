import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, mapTo, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { AuthenticationService, IProfile, ProfileService } from '@perxtech/core';
import { MatSidenavContainer } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'hkbn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSidenavContainer, { static: false }) private navContainer: MatSidenavContainer;
  public routeData: any = null;
  public user: IProfile;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private location: Location
  ) {
  }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe((profile) => {
      this.user = profile;
    });

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
      this.routeData = routeData;
    });
  }
  public ngAfterViewInit(): void {
    this.router.events.subscribe(() => this.navContainer.close());
  }
  public goBack(): void {
    this.location.back();
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
