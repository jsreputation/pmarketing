import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ITheme } from '../../utils/themes/themes.model';
import { Colors } from '../../perx-core.constants';
import {
  Observable,
  of
} from 'rxjs';
import {
  IPrice,
  IReward
} from '../models/reward.model';
import { ThemesService } from '../../utils/themes/themes.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'perx-core-rewards-large-list',
  templateUrl: './rewards-large-list.component.html',
  styleUrls: ['./rewards-large-list.component.scss']
})
export class RewardsLargeListComponent implements OnInit {


  public repeatGhostCount: number = 10;
  public theme: ITheme | null = null;
  public colorPrimary: Colors = Colors.Primary;
  public ghostTimeOut: boolean;

  @Input('rewardsList')
  public rewards$: Observable<IReward[]>;

  @Input()
  public defaultImg: string;

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => Observable<string>;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

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

    of(true).pipe(delay(2000)).subscribe(
      () => this.ghostTimeOut = true
    );
  }

  public isRewardQueryComplete(rewards: IReward[] | null): boolean {
    return Array.isArray(rewards) || this.ghostTimeOut;
  }

  public rewardClickedHandler(reward: IReward): void {
    this.tapped.emit(reward);
  }
}
