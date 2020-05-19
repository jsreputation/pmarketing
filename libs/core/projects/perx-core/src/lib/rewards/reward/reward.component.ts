import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPrice, IReward } from '../models/reward.model';

@Component({
  selector: 'perx-core-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  @Input('reward')
  public reward$: Observable<IReward>;

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => string;

  @Input()
  public showRewardIdentifier: boolean = false;

  @Input()
  public showExpiry: boolean = true;

  @Input()
  public descriptionLabel: string = 'Description';

  @Input()
  public tncLabel: string = 'Terms and Conditions';

  constructor(private translate: TranslateService) { }

  public ngOnInit(): void {
    if (!this.displayPriceFn) {
      this.translate.get(['REWARD.AND', 'REWARD.POINT']).subscribe((res: any) => {
        this.displayPriceFn = (rewardPrice: IPrice) => {
          if (rewardPrice.price && rewardPrice.price > 0) {
            if (rewardPrice.points && rewardPrice.points > 0) {
              return `${rewardPrice.currencyCode} ${rewardPrice.price}${res.REWARD && res.REWARD.AND}${rewardPrice.points}${res['REWARD.POINT']}`;
            }
            return `${rewardPrice.currencyCode} ${rewardPrice.price}`;
          }

          if (rewardPrice.points && rewardPrice.points > 0) {
            return `${rewardPrice.points}${res.REWARD && res.REWARD.POINT}`;
          }
          return `0${res['REWARD.POINT']}`; // is actually 0 or invalid value default
        };
      });
    }
  }
}
