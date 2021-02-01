import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Observable, forkJoin, of, Subject
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
export class LargeVouchersComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  public vouchers$: Observable<Voucher[]>;
  public currentPage: number = 0;
  public completed: boolean = false;
  public sourceType: string | undefined = undefined;
  public rewards$: Observable<IReward[]>;
  public voucherList: Voucher[] = [];

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

    this.vouchers$ = of([]);
    this.onScroll();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onScroll(): void {
    this.currentPage = this.currentPage + 1;
    if (this.completed) {
      return;
    }
    forkJoin(
      this.vouchers$,
      this.vouchersService.getFromPage(this.currentPage, { type: 'all', sourceType: this.sourceType })
    ).subscribe((val) => {
      if (val[1].length && val[1].length < REQ_PAGE_SIZE) {
        this.completed = true;
      }
      this.voucherList = [...val[0], ...val[1]];
      const rewardList: IReward[] = [];
      this.voucherList.forEach((obj: Voucher) => {
        if (obj.reward) {
          rewardList.push(obj.reward);
        }
      });
      this.vouchers$ = of(this.voucherList);
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
    for (const v of this.voucherList) {
      if (v.reward && v.reward.id === reward.id) {
        voucherId = v.id;
      }
    }

    this.router.navigate(
      [`/reward-voucher-detail/${reward.id}/${voucherId}`], navigationExtras);
  }

}
