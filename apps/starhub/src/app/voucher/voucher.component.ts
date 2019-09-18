import { Component, OnInit } from '@angular/core';
import { Voucher, ILocation, IVoucherService } from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { AnalyticsService, PageType } from '../analytics.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  public voucher: Voucher;
  public locations: ILocation[];
  public isButtonEnable: boolean = false;

  constructor(private vouchersService: IVoucherService, private activeRoute: ActivatedRoute, private analytics: AnalyticsService) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id))
      )
      .subscribe((voucher: Voucher) => {
        this.voucher = voucher;
        const category: string = voucher.categories && voucher.categories.length > 0 ? voucher.categories[0] : undefined;
        if (category !== undefined) {
          const pageName: string = `rewards:vouchers:${category}:${voucher.name}`;
          this.analytics.addEvent({
            pageName,
            pageType: PageType.detailPage,
            siteSectionLevel2: 'rewards:vouchers',
            siteSectionLevel3: pageName
          });
        }
      });
  }

  public setButton(isEnable: boolean): void {
    this.isButtonEnable = isEnable;
  }
}
