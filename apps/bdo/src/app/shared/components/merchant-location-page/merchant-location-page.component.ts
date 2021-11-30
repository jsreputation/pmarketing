import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IMerchantLocation, IVoucherLocation, IVoucherService, LocationsService } from '@perxtech/core';
import { switchMap, tap } from 'rxjs/operators';
import { iif } from 'rxjs';
@Component({
  selector: 'bdo-merchant-location-page',
  templateUrl: './merchant-location-page.component.html',
  styleUrls: ['./merchant-location-page.component.scss'],
})
export class MerchantLocationPageComponent implements OnInit {
  public location: IMerchantLocation[] | IVoucherLocation[];

  private rid: number;
  public displayMode: 'phone' | 'location';
  constructor(
    private voucherService: IVoucherService,
    private locationsService: LocationsService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {

    this.activeRoute.params
      .pipe(
        tap(param => this.rid = param.id),
        switchMap(() => this.activeRoute.queryParams),
        tap(params => {this.displayMode = params.display === 'phone' ? params.display : 'location'}),
        switchMap((params) => iif(() => params.mode === 'campaign',
          this.locationsService.getMerchantLocationsFromCampaign(this.rid),
          this.voucherService.getRewardLocations(this.rid)
          )
        )
      )
      .subscribe((item) => {
        this.location = item;
      });
  }

  navigateGoogleMaps(lat, lng) {
    const queryParams: Params = { lat: lat, long: lng };
    this.router.navigate([`treat-welcome/${this.rid}/location/map`], {
      queryParams: queryParams
    });
  }
}
