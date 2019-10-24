import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Voucher, IVoucherService, RedemptionType, IPopupConfig, PopupComponent } from '@perx/core';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, map, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'perx-blackcomb-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit, OnDestroy {
  public voucher$: Observable<Voucher>;
  public voucherId: number;
  public redemptionType: RedemptionType;
  private destroy$: Subject<void> = new Subject<void>();
  public rt: typeof RedemptionType = RedemptionType;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private vouchersService: IVoucherService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.voucher$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => Number.parseInt(params.get('id'), 10)),
        tap((id: number) => this.voucherId = id),
        switchMap((id: number) => this.vouchersService.get(id)),
        tap((voucher: Voucher) => this.redemptionType = voucher.redemptionType),
        takeUntil(this.destroy$)
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public pinInputSuccess(): void {
    this.popup({
      title: 'Redeem Successfully',
      text: 'ID: ' + this.voucherId
    });
  }

  public errorHandler(status: number): void {
    if (status === 401) {
      this.needLoginPopup();
    } else {
      this.errorPopup();
    }
  }

  public needLoginPopup(): void {
    this.popup({
      title: 'You need to login to redeem the voucher',
      buttonTxt: 'Go to login'
    })
      .afterClosed()
      .subscribe(() => this.router.navigate(['/login']));
  }

  public errorPopup(): void {
    this.popup({
      title: 'Error occur, please try again later'
    });
  }

  public popup(data: IPopupConfig): MatDialogRef<PopupComponent> {
    return this.dialog.open(PopupComponent, { data });
  }

  public goBack(): void {
    this.location.back();
  }
}
