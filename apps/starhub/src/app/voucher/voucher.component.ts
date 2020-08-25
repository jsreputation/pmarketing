import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Params,
} from '@angular/router';

import {
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import {
  Voucher,
  ILocation,
  IVoucherService,
  IReward,
  ICategoryTags,
  isEmptyArray,
  VoucherState,
} from '@perxtech/core';

import {
  AnalyticsService,
  PageType,
} from '../analytics.service';
import {
  IMacaron,
  MacaronService,
} from '../services/macaron.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  public voucher?: Voucher;
  public locations: ILocation[];
  public isButtonEnable: boolean = false;
  public macaron: IMacaron | null;
  constructor(
    private vouchersService: IVoucherService,
    private activeRoute: ActivatedRoute,
    private analytics: AnalyticsService,
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
          const categories: ICategoryTags[] = voucher.reward && voucher.reward.categoryTags || [];
          const category: string = !isEmptyArray(categories) ? categories[0].title : '';
          if (category !== undefined) {
            const pageName: string = `rewards:vouchers:${category.toLowerCase()}:${voucher.reward && voucher.reward.name}`;
            this.analytics.addEvent({
              pageName,
              pageType: PageType.detailPage,
              siteSectionLevel2: 'rewards:vouchers',
              siteSectionLevel3: `rewards:vouchers:${category.toLowerCase()}`
            });
          }
        }),
        map((voucher: Voucher) => voucher.reward)
      )
      .subscribe((reward: IReward) => {
        this.macaron = this.macaronService.getMacaron(reward);
        if (this.macaron === null) {
          this.isButtonEnable = true;
        }
      });
  }

  public isButtonDisabled(): boolean {
    if (
      !this.voucher ||
      (this.voucher.state !== VoucherState.issued && this.voucher.state !== VoucherState.released)
    ) {
      return true;
    }
    return false;
  }
}
