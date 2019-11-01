import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import {
  IPrice,
  IReward ,
} from '../models/reward.model';

@Component({
  selector: 'perx-core-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  private defaultButtonTxt: string = null;

  @Input('reward')
  public reward$: Observable<IReward>;

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => string;

  @Input()
  public showRewardIdentifier: boolean = false;

  @Input()
  public showExpiry: boolean = true;

  public getButtonTxt(buttonTxt: string): string {
    return buttonTxt || this.defaultButtonTxt;
  }

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.get('BACK_TO_WALLET').subscribe( text => this.defaultButtonTxt = text);
  }

  public ngOnInit(): void {
    if (!this.displayPriceFn) {
      this.displayPriceFn = (rewardPrice: IPrice) => {
        if (rewardPrice.price > 0) {
          return `${rewardPrice.currencyCode} ${rewardPrice.price}`;
        }

        if (rewardPrice.points > 0) {
          return `${rewardPrice.points} points`;
        }
        return '0 points'; // is actually 0 or invalid value default
      };
    }
  }
}
