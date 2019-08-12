import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { VouchersService } from '../vouchers.service';
import { Observable } from 'rxjs';
import { IVoucher, StatusLabelMapping } from '../models/voucher.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'perx-core-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit, OnChanges {
  @Input() public filter: string;
  @Input() public imageSize: string;
  @Input() public iconDisplay: string;
  @Input() public showTitle: boolean = true;
  @Input() public showMerchant: boolean = true;
  @Input() public showExpireDate: boolean = true;
  @Input() public showRedeemedDate: boolean = true;
  @Input() public showRedeemedIcon: boolean = true;
  @Input() public canSelectRedeemed: boolean = false;

  /**
   * @deprecated
   */
  @Output() public route: EventEmitter<number | string> = new EventEmitter<number | string>();
  @Output() public tapped: EventEmitter<IVoucher> = new EventEmitter<IVoucher>();

  @Input('data')
  public vouchers$: Observable<IVoucher[]>;

  constructor(private vouchersService: VouchersService) { }

  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };

  public ngOnInit(): void {
    if (!this.vouchers$) {
      this.vouchers$ = this.vouchersService.getAll().pipe(
        map(vouchers =>  (this.filter) ? vouchers.filter(v => v.state === this.filter) : vouchers)
      );
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.filter) {
      this.vouchers$ = this.vouchersService.getAll().pipe(
        map(vouchers => {
          return vouchers.filter(v => v.state === this.filter);
        })
      );
    }
  }

  public onClick(voucher: IVoucher): void {
    if (!this.canSelectRedeemed && voucher.state === 'redeemed') {
      return;
    }
    // tslint:disable-next-line: deprecation
    this.route.emit(voucher.id);

    this.tapped.emit(voucher);
  }
}
