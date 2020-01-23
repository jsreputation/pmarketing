import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import {
  Observable, combineLatest, of
} from 'rxjs';

import {
  IVoucherService,
  VoucherState,
  Voucher,
  IStampCard,
  ConfigService,
  IConfig,
  StampState,
  ICampaignService,
  CampaignType,
  ICampaign,
  StampService
} from '@perx/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { tap, mergeMap, map, filter, catchError, take } from 'rxjs/operators';
import { oc } from 'ts-optchain';

interface IStampCardConfig {
  stampsType: string;
}

@Component({
  selector: 'perx-blackcomb-pages-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  public stampCards$: Observable<IStampCard[]>;
  public vouchers$: Observable<Voucher[]>;
  public filter: string[];
  public rewardsHeadline: string;
  public expiryLabelFn: ((v: Voucher) => string) | undefined;

  public stampsType: string;
  public puzzleTextFn: (puzzle: IStampCard) => string;
  public titleFn: (index?: number) => string;
  public campaignId: number | null | undefined;
  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private datePipe: DatePipe,
    private translate: TranslateService,
    private configService: ConfigService,
    private campaignService: ICampaignService,
    private stampService: StampService,
  ) {
    this.puzzleTextFn = (puzzle: IStampCard) => !puzzle.stamps ||
      puzzle.stamps.filter(st => st.state === StampState.issued).length !== 1 ? 'new stamps' : 'new stamp';
    this.titleFn = (index?: number, totalCount?: number) => index !== undefined ?
      `Stamp Card ${this.puzzleIndex(index)} out of ${totalCount}` : '';
  }

  public ngOnInit(): void {
    this.getCampaign();
    this.translate.get('MY_WALLET').subscribe(text => this.rewardsHeadline = text);
    this.vouchers$ = this.vouchersService.getAll();
    this.filter = [VoucherState.issued, VoucherState.released];
    this.translate.get('VOUCHER_EXPIRY')
      .subscribe((text: string) => {
        this.expiryLabelFn = (v: Voucher) => {
          const dateStr = this.datePipe.transform(v.expiry, 'shortDate');
          return text.replace('{{date}}', dateStr || '~');
        };
      });
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }

  private getCampaign(): void {
    this.configService.readAppConfig<IStampCardConfig>()
      .pipe(
        tap((config: IConfig<IStampCardConfig>) => this.stampsType = oc(config).custom.stampsType('puzzle')),
        mergeMap(() => this.fetchCampaign()),
        filter((card: IStampCard) => card !== undefined)
      )
      .subscribe((card: IStampCard) => this.campaignId = card.campaignId);
  }

  private fetchCampaign(): Observable<IStampCard> {
    return this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CampaignType.stamp)),
        // map(campaigns => (this.stampsType === 'puzzle') ?
        //   campaigns.filter(camp => camp.type === CampaignType.stamp).slice(0, 1) : campaigns
        // ),
        tap(cs => console.log('campaigns', cs)),
        mergeMap((cs: ICampaign[]) =>
          combineLatest(...cs.map((c: ICampaign) => this.stampService.getCurrentCard(c.id).pipe(catchError(() => of(void 0)))))
        ),
        tap(cs => console.log('cards', cs)),
        map((cards: (IStampCard | undefined)[]) => cards.filter(c => c !== undefined)),
        tap(cs => console.log(cs)),
        // toArray(),
        // map((stampCards: IStampCard[]) => stampCards.filter(card =>
        //   card.displayProperties.displayCampaignAs && card.displayProperties.displayCampaignAs === this.stampsType
        // )),
        filter((cards: IStampCard[]) => cards.length > 0),
        take(1),
        map((cards: IStampCard[]) => cards[0])
      );
  }

  public puzzleIndex(index: number): string {
    if (index < 0) {
      return '';
    }
    return String(++index);
  }

  public selected(puzzle: IStampCard): void {
    this.router.navigate([`/stamp/${puzzle.campaignId}`]);
  }
}
