import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IVoucherLocation, IVoucherService } from '@perxtech/core';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'bdo-deal-location-page',
  templateUrl: './deal-location-page.component.html',
  styleUrls: ['./deal-location-page.component.scss'],
})
export class DealLocationPageComponent implements OnInit {
  lstVoucherLocation: IVoucherLocation[];
  rid: number;
  constructor(
    private voucherService: IVoucherService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((param) => {
          this.rid = param.rid;
          return this.voucherService.getRewardLocations(this.rid);
        })
      )
      .subscribe((item) => {
        this.lstVoucherLocation = item;
      });
  }

  navigateGoogleMaps(lat, lng) {
    const queryParams: Params = { lat: lat, long: lng };
    this.router.navigate([`deal-welcome/${this.rid}/location/map`], {
      queryParams: queryParams,
    });
  }
}
