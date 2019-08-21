import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Voucher, VoucherState, VouchersService } from '@perx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  public vouchers: Observable<Voucher[]>;

  public redeemedVouchers: Observable<Voucher[]>;

  public defaultNbVouchers: number = 3;

  public showSeeMoreBtn: boolean = false;

  @Output()
  public tapped: EventEmitter<Voucher> = new EventEmitter();

  constructor(private router: Router, private vouchersService: VouchersService) {
  }

  public ngOnInit(): void {
    const feed = this.vouchersService.getAll();
    this.vouchers = feed
      .pipe(
        map((vouchs: Voucher[]) => vouchs.filter(voucher => voucher.state === VoucherState.issued)));

    this.vouchers.subscribe(
      (vouchs: Voucher[]) => this.showSeeMoreBtn = vouchs.length <= this.defaultNbVouchers ? false : true);

    this.redeemedVouchers = feed
      .pipe(
        map((vouchs: Voucher[]) => vouchs.filter(voucher => voucher.state !== VoucherState.issued))
      );
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate(['/voucher'], { queryParams: { id: voucher.id } });
  }

  public seeMoreClicked(): void {
    this.showSeeMoreBtn = false;
  }
}
