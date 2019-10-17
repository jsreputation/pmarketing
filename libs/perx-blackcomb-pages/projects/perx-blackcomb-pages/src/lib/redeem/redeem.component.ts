import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Voucher, IVoucherService, RedemptionType, IPopupConfig, PopupComponent } from '@perx/core';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
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
  private destroy$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private vouchersService: IVoucherService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.voucher$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          this.voucherId =  Number.parseInt(id, 10);
          return this.vouchersService.get(this.voucherId);
        }),
        takeUntil(this.destroy$)
      );
    this.voucher$.subscribe((voucher: Voucher) => {
      this.redemptionType = voucher.reward.redemptionType;
    });
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
    const goToLoginDialog = this.popup({
      title: 'You need to login to redeem the voucher',
      buttonTxt: 'Go to login'
    });
    goToLoginDialog.afterClosed().subscribe(() => { this.router.navigate(['/login']); });
  }

  public errorPopup(): void {
    this.popup({
      title: 'Error occur, please try again later'
    });
  }

  public popup(data: IPopupConfig): MatDialogRef<PopupComponent> {
    return this.dialog
      .open(PopupComponent, { data });
  }
}
