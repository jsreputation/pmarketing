import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';

import { Router, ActivatedRoute } from '@angular/router';
import { IReward, RewardsService, IPrice } from '@perxtech/core';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'mc-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit, PageAppearence {
  public reward: Observable<IReward>;
  public rewardId: number;
  public displayPriceFn: (rewardPrice: IPrice) => Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rewardService: RewardsService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const stringId: string | null = params.get('rewardId');
      this.displayPriceFn = (rewardPrice: IPrice) => this.translate.get(['REWARD.AND', 'REWARD.POINT']).pipe(
        mergeMap((res: any) => {
          if (rewardPrice.price && rewardPrice.price > 0) {
            if (rewardPrice.points && rewardPrice.points > 0) {
              return of(`${rewardPrice.currencyCode} ${rewardPrice.price}${res['REWARD.AND']}${rewardPrice.points}${res['REWARD.POINT']}`);
            }
            return of(`${rewardPrice.currencyCode} ${rewardPrice.price}`);
          }

          if (rewardPrice.points && rewardPrice.points > 0) {
            return of(`${rewardPrice.points}${res.REWARD && res.REWARD.POINT}`);
          }
          return of(''); // is actually 0 or invalid value default
        })
      )
      if (stringId) {
        this.rewardId = parseInt(stringId, 10);
        this.getReward();
      }
    });
  }

  private getReward(): void {
    this.reward = this.rewardService.getReward(this.rewardId);
  }

  public onClick(): void {
    this.router.navigateByUrl(`redeem/${this.rewardId}`);
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.NONE,
      pageTitle: ''
    };
  }
}
