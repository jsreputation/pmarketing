import { Component, OnInit } from '@angular/core';

import { Observable, of, forkJoin } from 'rxjs';
import { Voucher, IVoucherService, StatusLabelMapping } from '@perxtech/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

const REQ_PAGE_SIZE: number = 10;
@Component({
  selector: 'perx-blackcomb-pages-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.scss']
})
export class WalletHistoryComponent implements OnInit {
  public issuedVoucher$: Observable<Voucher[]>;
  public redeemedVouchers$: Observable<Voucher[]>;
  private currentPageIssued: number = 1;
  private currentPageRedeemed: number = 1;
  private completedIssued: boolean = false;
  private completedRedeemed: boolean = false;
  private currentTabIndex: number = 0;
  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };
  public paramId: string;

  constructor(
    private vouchersService: IVoucherService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.issuedVoucher$ = this.vouchersService.getFromPage(this.currentPageIssued, { type: 'active' });
    this.redeemedVouchers$ = this.vouchersService.getFromPage(this.currentPageRedeemed, { type: 'redeemed' });
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate([`/voucher-detail/${voucher.id}`]);
  }

  public onScroll(): void {
    // check tab and completed status
    if ((this.completedIssued && this.currentTabIndex === 0) || (this.completedRedeemed && this.currentTabIndex === 1)) {
      return;
    }
    let updatedVoucher$ = this.issuedVoucher$;
    let currentPage: number;
    if (this.currentTabIndex === 1) {
      ++this.currentPageRedeemed;
      currentPage = this.currentPageRedeemed;
      updatedVoucher$ = this.redeemedVouchers$;
    } else {
      ++this.currentPageIssued;
      currentPage = this.currentPageIssued;
    }

    forkJoin(
      updatedVoucher$,
      this.vouchersService.getFromPage(currentPage, { type: this.currentTabIndex ? 'redeemed' : 'active' })
    )
      .subscribe(val => {
        // assume we reached end of records if 0 or less than 10 records are returned
        if (!val[1].length && val[1].length < REQ_PAGE_SIZE) {
          if (this.currentTabIndex === 1) {
            this.completedRedeemed = true;
          } else {
            this.completedIssued = true;
          }
        }
        if (this.currentTabIndex === 1) {
          this.redeemedVouchers$ = of([...val[0], ...val[1]]);
        } else {
          this.issuedVoucher$ = of([...val[0], ...val[1]]);
        }
      });

  }
  public changedTab(tab: MatTabChangeEvent): void {
    this.currentTabIndex = tab.index;
  }
}
