import { Component, OnInit } from '@angular/core';
import { Voucher, ILocation, IVoucherService, ICategoryTags } from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AnalyticsService, PageType } from '../analytics.service';
import { Observable } from 'rxjs';
import { MacaronService } from '../services/macaron.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  public voucher$: Observable<Voucher>;
  public locations: ILocation[];
  public isButtonEnabled: boolean = true;

  constructor(
    private vouchersService: IVoucherService,
    private activeRoute: ActivatedRoute,
    private analytics: AnalyticsService,
    private macaronService: MacaronService,
    private location: Location) {
  }

  public ngOnInit(): void {
    this.voucher$ = this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id)),
        tap((voucher: Voucher) => {
          const categories: ICategoryTags[] = voucher.reward.categoryTags;
          const category: string = categories && categories.length > 0 ? categories[0].title : undefined;
          if (category !== undefined) {
            const pageName: string = `rewards:vouchers:${category.toLowerCase()}:${voucher.reward.name}`;
            this.analytics.addEvent({
              pageName,
              pageType: PageType.detailPage,
              siteSectionLevel2: 'rewards:vouchers',
              siteSectionLevel3: `rewards:vouchers:${category.toLowerCase()}`
            });
          }

          const macaron = this.macaronService.getMacaron(voucher.reward);
          if (macaron === null) {
            this.isButtonEnabled = true;
          } else {
            this.isButtonEnabled = macaron.isButtonEnabled;
          }
        })
      );
  }

  public setButton(isEnable: boolean): void {
    this.isButtonEnabled = isEnable;
  }

  public back(): void {
    this.location.back();
  }
}
