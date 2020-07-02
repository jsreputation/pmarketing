import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { ITheme } from '../../utils/themes/themes.model';
import { Colors } from '../../perx-core.constants';
import {
  IPrice,
  IReward
} from '../../rewards/models/reward.model';
import { ThemesService } from '../../utils/themes/themes.service';
import { ILoyalty, ILoyaltyTransaction } from '../../loyalty/models/loyalty.model';
import { switchMap, share, map } from 'rxjs/operators';
import { LoyaltyService } from '../../loyalty/loyalty.service';

export type MerchantData = {
  merchantId: number;
  name: string;
  description: string;
  imgUrl: string;
  rebateAmount: string;
};

// part of rebates-wallet page
@Component({
  selector: 'perx-core-rebates-list',
  templateUrl: './rebates-list.component.html',
  styleUrls: ['./rebates-list.component.scss']
})
export class RebatesListComponent implements OnInit {
  @Input('data') public merchants$: Observable<ILoyalty[]>;

  public theme: ITheme | null = null;
  public colorPrimary: Colors = Colors.Primary;

  @Input('rewardsList')
  public rewards$: Observable<IReward[]>;

  @Input()
  public defaultImg: string;

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => string;

  @Output()
  public tapped: EventEmitter<ILoyalty> = new EventEmitter<ILoyalty>();

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
    private loyaltyService: LoyaltyService
  ) { }

  public ngOnInit(): void {
    this.initTheme();
    if (!this.merchants$) {
      this.merchants$ = this.loyaltyService.getLoyalties().pipe(
        switchMap((loyalties: ILoyalty[]) => combineLatest(
          [...loyalties.map(loyalty => this.loyaltyService.getTransactions(loyalty.id).pipe(
            switchMap((transactions: ILoyaltyTransaction[]) => {
              if (transactions.length > 0) {
                return of(loyalty);
              }
              return of(null);
            })
          ))])
        ),
        map((res: ILoyalty[]) => res.filter(loyal => loyal !== null)),
        share()
      );
    }
  }

  public merchantClickedHandler(merchant: ILoyalty): void {
    this.tapped.emit(merchant);
  }
}
