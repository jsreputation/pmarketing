import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Voucher, VoucherState, IVoucherService } from '@perx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  public savedVouchers: Observable<Voucher[]>;

  public redeemedVouchers: Observable<Voucher[]>;

  public defaultNbVouchers: number = 5;

  public hideSeeMore: boolean = false;

  @Output()
  public tapped: EventEmitter<Voucher> = new EventEmitter();

  constructor(private router: Router, private vouchersService: IVoucherService) { }

  public ngOnInit(): void {
    const feed = this.vouchersService.getAll();
    this.savedVouchers = feed
      .pipe(
        map((vouchs: Voucher[]) => {
          return vouchs.filter(voucher => voucher.state === VoucherState.issued);
        }));

    this.redeemedVouchers = feed
      .pipe(
        map((vouchers: Voucher[]) => vouchers.filter(voucher => voucher.state !== VoucherState.issued)),
        map((vouchers: Voucher[]) => vouchers.filter(voucher => this.daysSince(voucher.redemptionDate)))
      );
  }

  public voucherSelected(voucher: Voucher): void {
    this.router.navigate(['/voucher'], { queryParams: { id: voucher.id } });
  }

  public seeMoreClicked(): void {
    this.hideSeeMore = true;
  }

  private getDifferenceWithCurrentInDays(inputDate: Date): number {
    if (!inputDate) {
      // TODO: not sure about vouchers with null expiry
      return 0;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    return (inputDate.getTime() - currentDate.getTime()) / oneDay;
  }

  public getTextColorClass(voucher: Voucher): string {
    const days = this.getDifferenceWithCurrentInDays(voucher.expiry);
    return days >= 3 ? 'greater-three-days' : 'less-three-days';
  }

  public getNumberOfDays(voucher: Voucher): string {
    const daysDifference = Math.floor(this.getDifferenceWithCurrentInDays(voucher.expiry));
    return daysDifference < 0 ? '' : `Expires in ${daysDifference} days`;
  }

  private daysSince(expiryDate: Date): boolean {
    const daysElapsed = Math.abs(this.getDifferenceWithCurrentInDays(expiryDate));
    const daysToDisplay = 30;
    return daysToDisplay > daysElapsed;
  }
}
