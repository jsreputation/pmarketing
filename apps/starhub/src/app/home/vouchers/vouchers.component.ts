import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Voucher, IVoucherService, VoucherState } from '@perx/core';
import { Observable, forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';
import { PageType, AnalyticsService } from 'src/app/analytics.service';
//@ts-ignore
const REQ_PAGE_SIZE: number = 10;

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  public allVouchers: Observable<Voucher[]>;
  public defaultNbVouchers: number = 5;
  public hideSeeMore: boolean = false;
  private currentPage = 1;
  //@ts-ignore
  private complited = false;
  @Output()
  public tapped: EventEmitter<Voucher> = new EventEmitter();

  constructor(private router: Router, private vouchersService: IVoucherService, private analytics: AnalyticsService) { }

  public ngOnInit(): void {
    this.analytics.addEvent({
      pageName: 'rewards:vouchers',
      pageType: PageType.landingPage,
      siteSectionLevel2: 'rewards:vouchers',
      siteSectionLevel3: 'rewards:vouchers'
    });
    this.allVouchers = of([]);
    this.addVouchers();
  }
  public addVouchers() {
    ++this.currentPage;
    forkJoin(
      this.allVouchers,
      this.vouchersService.getFromPage(this.currentPage)
    )
      .subscribe(val => {
        const allVouchers = [...val[0], ...val[1]];
        const savedVouchersLenth = allVouchers
        .filter(voucher => voucher.state === VoucherState.issued)
        .filter(voucher => voucher.redemptionDate && this.daysSince(voucher.redemptionDate)).length;
        const redeemedVouchers = allVouchers
        .filter(voucher => voucher.state !== VoucherState.issued)
        .filter(voucher => voucher.redemptionDate && this.daysSince(voucher.redemptionDate)).length;
        if (savedVouchersLenth + redeemedVouchers < 15) {
          this.addVouchers();
        }
        this.allVouchers = of([...val[0], ...val[1]])
      });
  }
  public voucherSelected(voucher: Voucher): void {
    this.router.navigate(['/voucher'], { queryParams: { id: voucher.id } });
  }

  public seeMoreClicked(): void {
    this.hideSeeMore = true;
  }

  private getDifferenceWithCurrentInDays(inputDate: Date | null): number {
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

  public daysSince(expiryDate: Date): boolean {
    const daysElapsed = Math.abs(this.getDifferenceWithCurrentInDays(expiryDate));
    const daysToDisplay = 30;
    return daysToDisplay > daysElapsed;
  }

  public onScroll() {
    this.addVouchers();
  }
}
