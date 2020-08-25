import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ILocation, LocationsService, IReward, filterDuplicateLocations, IVoucherService } from '@perxtech/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { AnalyticsService, PageType } from '../analytics.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  public locations$: Observable<ILocation[]>;

  constructor(
    private location: Location,
    private locationService: LocationsService,
    private activeRoute: ActivatedRoute,
    private analytics: AnalyticsService,
    public voucherService: IVoucherService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.merchantId),
        map((params: Params) => params.merchantId)
      )
      .subscribe(
        (merchantId: number) => {
          this.locations$ = this.locationService.getFromMerchant(merchantId).pipe(map(filterDuplicateLocations));
        },
        (error) => {
          if (error.status === 401) {
            this.router.navigate(['/error']);
          }
        }
      );
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.voucherId),
        map((params: Params) => params.voucherId),
        tap((voucherId) => this.voucherService.get(voucherId)),
        map((voucher) => voucher.reward),
        filter((reward: IReward) => reward && !!reward.categoryTags && reward.categoryTags.length > 0)
      )
      .subscribe(
        (reward: IReward) => {
          const category = reward.categoryTags ? reward.categoryTags[0].title : '';
          this.analytics.addEvent({
            pageName: `rewards:discover:locations:${category}:${reward.name}`,
            pageType: PageType.detailPage,
            siteSectionLevel2: 'rewards:discover',
            siteSectionLevel3: 'rewards:discover:locations'
          });
        },
        (error) => {
          if (error.status === 401) {
            this.router.navigate(['/error']);
          }
        }
      );
  }

  public back(): void {
    this.location.back();
  }
}
