import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Voucher, IVoucherService } from '@perx/core';
import { Observable, forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';
import { PageType, AnalyticsService } from 'src/app/analytics.service';
import { map } from 'rxjs/operators';

const REQ_PAGE_SIZE: number = 10;

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  public issuedVoucher: Observable<Voucher[]>;
  public redeemedVouchers: Observable<Voucher[]>;
  public defaultNbVouchers: number = 5;
  public hideSeeMore: boolean = false;
  private currentPage: number = 1;
  private complited: boolean = false;
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
    this.issuedVoucher = this.vouchersService.getFromPage(this.currentPage, { type: 'active' });
    this.redeemedVouchers = this.vouchersService.getAll({ type: 'redeemed' })
    .pipe(map((vouchers: Voucher[]) => vouchers.filter(voucher => voucher.redemptionDate && this.daysSince(voucher.redemptionDate))));
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

  public onScroll(): void {
    if (this.complited) {
      return;
    }
    ++this.currentPage;
    forkJoin(
      this.issuedVoucher,
      this.vouchersService.getFromPage(this.currentPage, { type: 'active' })
    )
      .subscribe(val => {
        if (!val[1].length && val[1].length < REQ_PAGE_SIZE) {
          this.complited = true;
        }
        this.issuedVoucher = of([...val[0], ...val[1]]);
      });
  }
}
