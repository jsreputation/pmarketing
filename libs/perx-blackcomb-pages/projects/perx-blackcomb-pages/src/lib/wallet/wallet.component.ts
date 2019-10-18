import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICampaign, ICampaignService, IVoucherService, VoucherState, Voucher, CampaignType, StampService } from '@perx/core';
import { Router } from '@angular/router';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
  public campaigns$: Observable<ICampaign[]>;
  public vouchers$: Observable<Voucher[]>;
  private destroy$: Subject<any> = new Subject();
  public filter: string[];

  constructor(
    private router: Router,
    private vouchersService: IVoucherService,
    private stampService: StampService,
    private campaignService: ICampaignService
  ) { }

  public ngOnInit(): void {
    this.stampCard$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          const idN = Number.parseInt(id, 10);
          return this.stampService.getCurrentCard(idN);
        }),
        takeUntil(this.destroy$)
      );
    this.stampCard$.subscribe(
      (stampCard: IStampCard) => {
        this.title = stampCard.title;
        this.subTitle = stampCard.subTitle;
        this.background = stampCard.displayProperties.bgImage;
        this.cardBackground = stampCard.displayProperties.cardBgImage;
      },
      () => {
        this.router.navigate(['/wallet']);
      }
    );
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
