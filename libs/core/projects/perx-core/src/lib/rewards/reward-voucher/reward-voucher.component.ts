import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { IPrice, IReward } from '../models/reward.model';
import { TokenStorage } from '../../utils/storage/token-storage.service';
import { map } from 'rxjs/operators';
import { CampaignRewardMode, ProgressBarFields } from '@perxtech/core';

@Component({
  selector: 'perx-core-reward-voucher',
  templateUrl: './reward-voucher.component.html',
  styleUrls: ['./reward-voucher.component.scss']
})
export class RewardVoucherComponent implements OnInit {
  @Input()
  public rewardProgress: ProgressBarFields;

  @Input()
  public useRewardDescription: boolean = false;

  @Input()
  public barHeadLine: string;

  @Input()
  public rewardType: CampaignRewardMode;

  @Input('reward')
  public rewardInitial$: Observable<IReward>;

  public reward$: Observable<IReward>;

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => Observable<string>;

  @Input()
  public showRewardIdentifier: boolean = false;

  @Input()
  public showExpiry: boolean = true;

  @Input()
  public descriptionLabel: Observable<string> = of('Description');

  @Input()
  public tncLabel: Observable<string> = of('Terms and Conditions');

  @Input()
  public codeLabel: Observable<string> = of('Code');

  @Input()
  public expiryLabel: Observable<string> = of('Expiry');

  @Input()
  public showRewardFavButton?: boolean;

  @Input()
  public showNoCodeReward: boolean;

  public favoriteRewards: IReward[];

  public constructor(
    private tokenStorage: TokenStorage
  ) {
  }

  public ngOnInit(): void {
    this.favoriteRewards = (
      this.tokenStorage.getAppInfoProperty('favoriteRewards') as unknown as IReward[]
    ) || [];
    this.reward$ = this.rewardInitial$.pipe(
      map(reward => {
        const tncWithOlPadding = reward.termsAndConditions.replace(/(ol>)/, 'ol style="padding-inline-start: 1em;">');
        return {...reward, termsAndConditions: tncWithOlPadding};
      })
    );
    if (!this.displayPriceFn) {
      this.displayPriceFn = (rewardPrice: IPrice) => {
        if (rewardPrice.price && parseFloat(rewardPrice.price) > 0) {
          if (rewardPrice.points && rewardPrice.points > 0) {
            return of(`${rewardPrice.currencyCode} ${rewardPrice.price} and ${rewardPrice.points} points`);
          }
          return of(`${rewardPrice.currencyCode} ${rewardPrice.price}`);
        }

        if (rewardPrice.points && rewardPrice.points > 0) {
          return of(`${rewardPrice.points} points`);
        }
        return of(''); // is actually 0 or invalid value default
      };
    }
  }

  public rewardFavoriteHandler(rewardToggled: IReward): void {
    const favoriteRewards = this.tokenStorage.getAppInfoProperty('favoriteRewards');
    let rwdsArray;
    if (favoriteRewards) {
      // if found id remove it, if cant find add it
      const foundIndex = (favoriteRewards as unknown as IReward[]).findIndex(
        reward => reward.id === rewardToggled.id);
      if (foundIndex >= 0) {
        (favoriteRewards as unknown as IReward[]).splice(foundIndex, 1);
        rwdsArray = favoriteRewards;
      } else {
        rwdsArray = [...favoriteRewards, rewardToggled];
      }
    } else {
      rwdsArray = [rewardToggled];
    }
    this.favoriteRewards = rwdsArray;
    this.tokenStorage.setAppInfoProperty(rwdsArray, 'favoriteRewards');
  }
}
