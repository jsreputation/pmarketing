import { Component, EventEmitter, Output, Input } from '@angular/core';
import {Observable} from 'rxjs';
import {ITheme} from '../../utils/themes/themes.model';
import {Colors} from '../../perx-core.constants';
import {IPrice, IReward} from '../../rewards/models/reward.model';
import {ThemesService} from '../../utils/themes/themes.service';

export type MerchantData = {
  merchantId: number;
  name: string;
  description: string;
  imgUrl: string;
  rebateAmount: string;
}

// part of rebates-wallet page
@Component({
  selector: 'perx-core-rebates-list',
  templateUrl: './rebates-list.component.html',
  styleUrls: ['./rebates-list.component.scss']
})
export class RebatesListComponent {
  @Input('data') public merchants$: Observable<MerchantData[]>;

  public theme: ITheme | null = null;
  public colorPrimary: Colors = Colors.Primary;

  @Input('rewardsList')
  public rewards$: Observable<IReward[]>;

  @Input()
  public defaultImg: string;

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => string;

  @Output()
  public tapped: EventEmitter<MerchantData> = new EventEmitter<MerchantData>();

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
  }

  public merchantClickedHandler(merchant: MerchantData): void {
    this.tapped.emit(merchant);
  }
}
