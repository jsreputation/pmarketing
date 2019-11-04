import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IVoucherService, Voucher } from '@perx/core';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'perx-blackcomb-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent implements OnInit, OnDestroy {
  public expiryLabelFn: (v: Voucher) => string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private vouchersService: IVoucherService,
    private translate: TranslateService,
    private datePipe: DatePipe
  ) { }

  public voucher$: Observable<Voucher>;
  private destroy$: Subject<any> = new Subject();

  public ngOnInit(): void {
    this.voucher$ = this.activeRoute.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          const idN: number = Number.parseInt(id, 10);
          return this.vouchersService.get(idN);
        }),
        takeUntil(this.destroy$)
      );

    this.translate.get('VOUCHER_EXPIRY')
      .subscribe((text: string) => {
        this.expiryLabelFn = (v: Voucher) => {
          const dateStr = this.datePipe.transform(v.expiry, 'shortDate');
          return text.replace('{{date}}', dateStr);
        };
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onRedeem(): void {
    this.voucher$.subscribe((v: Voucher) => {
      this.router.navigate(['redeem', v.id]);
    });
  }
}
