import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Observable, of } from 'rxjs';

import {
  IPrice,
  IReward,
} from '../models/reward.model';
import {
  Colors,
} from '../../perx-core.constants';
import { ITheme } from '../../utils/themes/themes.model';
import { ThemesService } from '../../utils/themes/themes.service';

@Component({
  selector: 'perx-core-rewards-collection',
  templateUrl: './rewards-collection.component.html',
  styleUrls: ['./rewards-collection.component.scss']
})
export class RewardsCollectionComponent implements OnInit {

  public repeatGhostCount: number = 10;
  public colorPrimary: Colors = Colors.Primary;
  public theme: ITheme | null = null;
  public favoriteRewards: IReward[] = [];
  // to debounce fav button
  public favDisabled: boolean  = false;

  @Input('rewardsList')
  public rewards$: Observable<IReward[]>;

  @Input()
  public showRewardFavButton?: boolean;

  @Input()
  public defaultImg: string;

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => Observable<string>;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  @Output()
  public favoriteRewardEvent: EventEmitter<IReward> = new EventEmitter<IReward>();

  public get themeFontColor(): string | null {
    return this.theme ? this.theme.properties['--font_color'] : null;
  }

  private initTheme(): void {
    this.themesService.getThemeSetting().subscribe(
      theme => this.theme = theme
    );
  }

  constructor(
    private themesService: ThemesService,
  ) { }

  public ngOnInit(): void {
    this.initTheme();

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

  public rewardClickedHandler(reward: IReward): void {
    this.tapped.emit(reward);
  }

  public rewardFavoriteHandler(rewardToggled: IReward): void {
    this.favoriteRewardEvent.emit(rewardToggled);
  }

}
