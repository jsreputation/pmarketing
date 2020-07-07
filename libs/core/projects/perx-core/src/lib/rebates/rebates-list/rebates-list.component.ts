import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITheme } from '../../utils/themes/themes.model';
import { Colors } from '../../perx-core.constants';
import {
  IPrice,
  IReward
} from '../../rewards/models/reward.model';
import { ThemesService } from '../../utils/themes/themes.service';
import { ILoyalty } from '../../loyalty/models/loyalty.model';

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
  public displayPriceFn: (rewardPrice: IPrice) => Observable<string>;

  @Input()
  public rebatesDetailsTextFn: () => Observable<string>;

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
  ) { }

  public ngOnInit(): void {
    this.initTheme();
    if (!this.rebatesDetailsTextFn) {
      this.rebatesDetailsTextFn = () => of('rebate funds available');
    }
  }

  public merchantClickedHandler(merchant: ILoyalty): void {
    this.tapped.emit(merchant);
  }
}
