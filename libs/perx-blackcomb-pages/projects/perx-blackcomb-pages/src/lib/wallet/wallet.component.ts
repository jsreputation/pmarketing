import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import {
  Observable, from, forkJoin, of
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
import { tap, mergeMap, map, toArray } from 'rxjs/operators';

interface IStampCardConfig {
  stampsType: string;
}
const REQ_PAGE_SIZE: number = 10;
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

  public currentPage: number = 0;
  public completed: boolean = false;

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
  ) { }

  public ngOnInit(): void {
    this.getCampaign();
    this.translate.get('MY_WALLET').subscribe(text => this.rewardsHeadline = text);
    this.vouchers$ = of([]);
    this.onScroll();
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
    this.configService.readAppConfig<IStampCardConfig>().pipe(tap((config: IConfig<IStampCardConfig>) => {
      this.stampsType = config.custom && config.custom.stampsType ? config.custom.stampsType as string : 'puzzle';
    }), mergeMap(() => this.fetchCampaign())).subscribe((card: IStampCard) => {
      if (card) {
        this.campaignId = card.campaignId;
      }
    });
  }
  private fetchCampaign(): Observable<IStampCard> {
    return this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CampaignType.stamp)),
        map(campaigns => {
          if (this.stampsType === 'puzzle') {
            return campaigns.filter(camp => camp.type === CampaignType.stamp).slice(0, 1);
          }
          return campaigns;
        }),
        mergeMap(
          (campaigns: ICampaign[]) => from(campaigns).pipe(
            mergeMap((campaign: ICampaign) => this.fetchCard(campaign.id)),
            toArray(),
            map((stampCards: IStampCard[]) => stampCards.filter(card =>
              card.displayProperties.displayCampaignAs && card.displayProperties.displayCampaignAs === this.stampsType
            )),
            tap(() => {
              if (this.stampsType === 'stamp_card') {
                this.puzzleTextFn = (puzzle: IStampCard) => !puzzle.stamps ||
                  puzzle.stamps.filter(st => st.state === StampState.issued).length !== 1 ? 'new stamps' : 'new stamp';
                this.titleFn = (index?: number, totalCount?: number) => index !== undefined ?
                  `Stamp Card ${this.puzzleIndex(index)} out of ${totalCount}` : '';
              }
            }),
            map((cards: IStampCard[]) => cards[0])
          )
        ),
      );
  }

  private fetchCard(id: number): Observable<IStampCard> {
    return this.stampService.getCurrentCard(id);
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

  public onScroll(): void {
    this.currentPage = this.currentPage + 1;
    if (this.completed) {
      return;
    }
    forkJoin(
      this.vouchers$,
      this.vouchersService.getFromPage(this.currentPage, { type: 'active' })
    ).subscribe((val) => {
      if (!val[1].length && val[1].length < REQ_PAGE_SIZE) {
        this.completed = true;
      }
      this.vouchers$ = of([...val[0], ...val[1]]);
    });
  }
}
