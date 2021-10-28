import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IVoucherLocation, IVoucherService } from '@perxtech/core';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'bdo-deal-location-page',
  templateUrl: './deal-location-page.component.html',
  styleUrls: ['./deal-location-page.component.scss'],
})
export class DealLocationPageComponent {
  lstVoucherLocation: IVoucherLocation[];
  urlGoogleMap: string="";
  constructor(
    private voucherService: IVoucherService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap((param) => this.voucherService.getRewardLocations(param.rid))
      )
      .subscribe((item) => {
        this.lstVoucherLocation = item;
      });
  }
  navigateGoogleMaps(lat,lng){
    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_system');
  }
}
