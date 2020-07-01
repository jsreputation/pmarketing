import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { IVoucherService } from '../ivoucher.service';
import { Observable, of } from 'rxjs';
import { IVoucher, StatusLabelMapping, VoucherState } from '../models/voucher.model';
import { map, delay } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'perx-core-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit, OnChanges {
  @Input() public imageSize: string;
  @Input() public iconDisplay: string;
  @Input() public showTitle: boolean = true;
  @Input() public showMerchant: boolean = true;
  @Input() public showExpireDate: boolean = true;
  @Input() public showRedeemedDate: boolean = true;
  @Input() public showRedeemedIcon: boolean = false;
  @Input() public canSelectRedeemed: boolean = false;
  @Input() public sourceType: string;
  /**
   * @deprecated
   */
  @Output() public route: EventEmitter<number | string> = new EventEmitter<number | string>();
  @Output() public tapped: EventEmitter<IVoucher> = new EventEmitter<IVoucher>();

  @Input('data') public vouchers$: Observable<IVoucher[]>;

  @Input() public set filter(filter: string[]) {
    this.privateFilter = filter;
    this.vouchers$ = this.filterVoucher(this.vouchers$);
  }
  public get filter(): string[] {
    return this.privateFilter;
  }
  private privateFilter: string[];
  @Input()
  public mapping?: StatusLabelMapping;

  @Input()
  public expiryLabelFn: ((tr: IVoucher) => string);

  public repeatGhostCount: number = 10;

  public ghostTimeOut: boolean;

  constructor(private vouchersService: IVoucherService, private datePipe: DatePipe) {
    this.expiryLabelFn = (v: IVoucher) => v.expiry ? `Expiry: ${this.datePipe.transform(v.expiry, 'shortDate')}` : '';
  }

  public ngOnInit(): void {
    if (this.showRedeemedIcon && !this.mapping) {
      console.warn('\'mapping\' is not defined');
    }

    of(true).pipe(delay(2000)).subscribe(
      () => this.ghostTimeOut = true
    );
  }

  public ngOnChanges(): void {
    if (!this.vouchers$) {
      this.vouchers$ = this.vouchersService.getAll({ sourceType: this.sourceType, type: null });
    }
  }

  public isVoucherQueryComplete(vouchers: IVoucher[] | null): boolean {
    return Array.isArray(vouchers) || this.ghostTimeOut;
  }

  public notClickable(voucher: IVoucher): boolean {
    return !this.canSelectRedeemed && [VoucherState.redeemed, VoucherState.expired].includes(voucher.state);
  }

  public onClick(voucher: IVoucher): void {
    if (this.notClickable(voucher)) {
      return;
    }
    // tslint:disable-next-line: deprecation
    this.route.emit(voucher.id);

    this.tapped.emit(voucher);
  }

  private filterVoucher(vouchers: Observable<IVoucher[]>): Observable<IVoucher[]> {
    return vouchers ? vouchers.pipe(
      map(voucher => voucher.filter((el) => this.filter.includes(el.state)))) : vouchers;
  }
}
