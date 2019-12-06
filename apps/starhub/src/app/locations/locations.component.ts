import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ILocation, LocationsService, RewardsService, IReward } from '@perx/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { AnalyticsService, PageType } from '../analytics.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  public locations: Observable<ILocation[]>;

  constructor(
    private location: Location,
    private locationService: LocationsService,
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private analytics: AnalyticsService
  ) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.mid),
        map((params: Params) => params.mid)
      )
      .subscribe(
        (mid: number) => {
          this.locations = this.locationService.getFromMerchant(mid);
        }
      );
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.rid),
        map((params: Params) => params.rid),
        switchMap((rid: number) => this.rewardsService.getReward(rid)),
        filter((reward: IReward) => !!reward.categoryTags && reward.categoryTags.length > 0)
      )
      .subscribe(
        (reward: IReward) => {
          const category = reward.categoryTags ? reward.categoryTags[0].title : '';
          this.analytics.addEvent({
            pageName: `rewards:discover:locations:${category}:${reward.name}`,
            pageType: PageType.detailPage,
            siteSectionLevel2: 'rewards:discover',
            siteSectionLevel3: `rewards:discover:locations`
          });
        }
      );
  }

  public back(): void {
    this.location.back();
  }
}
