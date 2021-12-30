import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from '../shared/services/filter.service';
import { Location } from '@angular/common';

@Component({
  selector: 'bdo-main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {
  public isHome = true;
  public navigated = false;
  public isLocationLanding = false;
  public isNearbyPage = false;

  constructor(
    private location: Location,
    private filterService: FilterService,
    private router: Router,
    private activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isHome = this.router.url === '/home';
    this.isNearbyPage = this.router.url === '/nearby';
    this.router.events.subscribe(() => {
      this.isHome = this.router.url === '/home';
      this.navigated = true;
    });

    this.activeRouter.queryParams.subscribe(() => {
      const pattern = /^\/deal-welcome\/[0-9]+\/location\/map/;
      this.isLocationLanding = pattern.test(this.router.url);
    });
  }

  navigateToSearch() {
    this.router.navigate([ '/search' ]);
  }

  back() {
    if (this.filterService.isOpen()) {
      this.filterService.closeFilter();
      return;
    }

    if (this.navigated) {
      this.location.back();
    } else {
      this.router.navigate([ '/home' ]);
    }
  }
}
