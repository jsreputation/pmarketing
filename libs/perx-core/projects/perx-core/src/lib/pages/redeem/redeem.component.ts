import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucher, RedemptionType } from '../../vouchers/models/voucher.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { IVoucherService } from '../../vouchers/ivoucher.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { filter, switchMap } from 'rxjs/operators';
import { IPopupConfig, PopupComponent } from '../../utils/popup/popup.component';

@Component({
  selector: 'perx-core-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {
  public voucher$: Observable<IVoucher>;
  public voucherId: number;
  public redemptionType: RedemptionType;

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
          this.voucherId = Number.parseInt(id, 10);
          return this.vouchersService.get(this.voucherId);
        })
      );
    /*this.voucher$.subscribe((voucher: IVoucher) => {
      this.redemptionType = voucher.redemptionType;
    });*/
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
