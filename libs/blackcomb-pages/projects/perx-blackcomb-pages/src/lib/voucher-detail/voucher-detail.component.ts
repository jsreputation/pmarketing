import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  IVoucherService,
  Voucher,
  VoucherState,
  RedemptionType,
} from '@perxtech/core';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'perx-blackcomb-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss'],
})
export class VoucherDetailComponent implements OnInit, OnDestroy {
  public expiryLabelFn: (v: Voucher) => Observable<string>;
  public descriptionLabel: Observable<string> = of('Description');
  public tncLabel: Observable<string> = of('Terms and Conditions');
  public voucherId: number;
  public isRedeemable: boolean = false;
  public isVoucherTypeUrl: boolean = false;
  public voucherUrl: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private vouchersService: IVoucherService,
    private translate: TranslateService,
    private datePipe: DatePipe
  ) {}

  public voucher$: Observable<Voucher>;
  private destroy$: Subject<void> = new Subject();

  public ngOnInit(): void {
    this.voucher$ = this.activeRoute.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      map((params: ParamMap) => params.get('id')),
      switchMap((id: string) => {
        this.voucherId = Number.parseInt(id, 10);
        return this.vouchersService.get(this.voucherId);
      }),
      tap((voucher: Voucher) => {
        this.isRedeemable = voucher.state === VoucherState.issued; // must be in issued state
        this.isVoucherTypeUrl = voucher.redemptionType === RedemptionType.url;
        if (this.isVoucherTypeUrl) {
          this.voucherUrl = voucher.code ? voucher.code : '';
        }
      }),
      map((voucher: Voucher) => {
        const tncWithOlPadding =
          voucher &&
          voucher.reward &&
          voucher.reward.termsAndConditions.replace(
            /(ol>)/,
            'ol' + ' style="padding-inline-start:' + ' 1em;">'
          );
        return {
          ...voucher,
          reward: { ...voucher.reward, termsAndConditions: tncWithOlPadding },
        } as Voucher;
      }),
      takeUntil(this.destroy$)
    );

    this.translate.get('VOUCHER.EXPIRY').subscribe((text: string) => {
      this.expiryLabelFn = (v: Voucher) => {
        const dateStr = this.datePipe.transform(v.expiry, 'shortDate');
        return of(text.replace('{{date}}', dateStr || '~'));
      };
    });
    this.translate.get('DESCRIPTION').subscribe((desc: string) => {
      this.descriptionLabel = of(desc);
    });
    this.translate
      .get('VOUCHER.TERMS_AND_CONDITIONS')
      .subscribe((tnc: string) => {
        this.tncLabel = of(tnc);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onRedeem(): void {
    this.router.navigate(['redeem', this.voucherId]);
  }
}
