import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import {
  Observable, from
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
  StampService,
} from '@perx/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { tap, mergeMap, map, toArray } from 'rxjs/operators';

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

  public sourceType: string = 'puzzle';
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
    private stampService: StampService
  ) { }

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
    this.configService.readAppConfig().pipe(tap((config: IConfig) => {
      this.sourceType = config.sourceType as string;
      if (config.sourceType === 'stamp_card') {
        this.puzzleTextFn = (puzzle: IStampCard) => !puzzle.stamps ||
          puzzle.stamps.filter(st => st.state === StampState.issued).length !== 1 ? 'new stamps' : 'new stamp';
        this.titleFn = (index?: number) => index !== undefined ? `Stamp Card ${this.puzzleIndex(index)} out of 12` : '';
      }
    }), mergeMap(() => this.fetchCampaign())).subscribe((card: IStampCard) => {
      this.campaignId = card.campaignId;
    });
  }
  private fetchCampaign() {
    return this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CampaignType.stamp)),
        map(campaigns => {
          if (this.sourceType === 'puzzle') {
            return campaigns.filter(camp => camp.type === CampaignType.stamp).slice(0, 1);
          }
          return campaigns;
        }),
        mergeMap(
          (campaigns: ICampaign[]) => from(campaigns).pipe(
            mergeMap((campaign: ICampaign) => this.fetchCard(campaign.id)),
            toArray(),
            map((stampCards: IStampCard[]) => stampCards.filter(card =>
              card.displayProperties.displayCampaignAs && card.displayProperties.displayCampaignAs === this.sourceType
            )),
            map((cards: IStampCard[]) => cards[0])
          )
        ),
      )

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
    this.router.navigate([`/puzzle/${this.campaignId}/${puzzle.id}`]);
  }
  public completed(): void {
    if (this.sourceType === 'puzzle') {
      // this.notificationService.addPopup({
      //   // tslint:disable-next-line: max-line-length
      //   text: 'Thank you for joining the HSBC Collect V2.0 Promo! You have already received the maximum number of puzzle pieces. Don\'t forget to redeem your earned rewards!'
      // });
    }
  }
}
