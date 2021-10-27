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
}
