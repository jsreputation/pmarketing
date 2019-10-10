import { Component, OnInit } from '@angular/core';
import { Voucher, ILocation, IVoucherService, RewardsService, IReward } from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { AnalyticsService, PageType } from '../analytics.service';
import { IMacaron, MacaronService } from '../services/macaron.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  public voucher: Voucher;
  public reward: IReward;
  public locations: ILocation[];
  public isButtonEnable: boolean = false;
  public macaron: IMacaron;
  constructor(
    private vouchersService: IVoucherService,
    private activeRoute: ActivatedRoute,
    private analytics: AnalyticsService,
    private rewardService: RewardsService,
    private macaronService: MacaronService
  ) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id)),
        tap((voucher: Voucher) => {
          this.voucher = voucher;
          const category: string = voucher.categories && voucher.categories.length > 0 ? voucher.categories[0] : undefined;
          if (category !== undefined) {
            const pageName: string = `rewards:vouchers:${category.toLowerCase()}:${voucher.name}`;
            this.analytics.addEvent({
              pageName,
              pageType: PageType.detailPage,
              siteSectionLevel2: 'rewards:vouchers',
              siteSectionLevel3: `rewards:vouchers:${category.toLowerCase()}`
            });
          }
        }),
        mergeMap((voucher: Voucher) => this.rewardService.getReward(voucher.rewardId))
      )
      .subscribe((reward: IReward) => {
        this.reward = reward;
        this.macaron = this.macaronService.getMacaron(reward);
        if (this.macaron === null) {
          this.isButtonEnable = true;
        }
      });
  }
}
