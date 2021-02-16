import { Component, OnInit } from '@angular/core';
import {
  Observable, of
} from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import {
  IVoucherService,
  Voucher,
  IConfig,
  ConfigService,
  IReward
} from '@perxtech/core';

const REQ_PAGE_SIZE: number = 10;
@Component({
  selector: 'perx-blackcomb-pages-large-vouchers',
  templateUrl: './large-vouchers.component.html',
  styleUrls: ['./large-vouchers.component.scss']
})
export class LargeVouchersComponent implements OnInit {

  public currentPage: number = 0;
  public completed: boolean = false;
  public sourceType: string | undefined = undefined;
  public rewards$: Observable<IReward[]>;
  public vouchers: Voucher[] = [];

  constructor(
    private vouchersService: IVoucherService,
    private configService: ConfigService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.sourceType = config.sourceType ? config.sourceType.toString() : undefined;
      });

    this.onScroll();
  }

  public onScroll(): void {
    this.currentPage = this.currentPage + 1;
    if (this.completed) {
      return;
    }

    this.vouchersService.getFromPage(this.currentPage, { type: 'all', sourceType: this.sourceType })
    .subscribe((val) => {
      if (val.length < REQ_PAGE_SIZE) {
        this.completed = true;
      }
      this.vouchers.push(...val);
      const rewardList: IReward[] = [];
      this.vouchers.forEach((obj: Voucher) => {
        if (obj.reward) {
          rewardList.push(obj.reward);
        }
      });
      this.rewards$ = of(rewardList);
    });
  }


  public onClick(reward: IReward): void {
    let navigationExtras: NavigationExtras = {};
    navigationExtras = {
      state: {
        showVoucherSummary: true
      }};

    let voucherId;
    for (const v of this.vouchers) {
      if (v.reward && v.reward.id === reward.id) {
        voucherId = v.id;
      }
    }

    this.router.navigate(
      [`/reward-voucher-detail/${reward.id}/${voucherId}`], navigationExtras);
  }

}
