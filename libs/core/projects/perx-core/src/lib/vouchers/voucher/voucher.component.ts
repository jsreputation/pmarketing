import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { IVoucherService } from '../ivoucher.service';
import { Observable } from 'rxjs';
import { IVoucher, StatusLabelMapping } from '../models/voucher.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'perx-core-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnChanges, OnInit {
  @Output() public redeem: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public hideMerchantImg: boolean = false;

  @Input()
  public hideMerchantName: boolean = false;

  @Input()
  public hideExpiry: boolean = false;

  @Input()
  public hideActions: boolean = false;

  @Input()
  public voucherId: number;

  @Input('voucher')
  public voucher$: Observable<IVoucher>;

  @Input()
  public showRedeemedIcon: boolean = false;

  @Input()
  public mapping?: StatusLabelMapping;

  @Input()
  public redeemLabelFn: () => string;

  @Input()
  public expiryFn: (v: IVoucher) => string;

  @Input()
  public descriptionLabel: string = 'Description';

  @Input()
  public tncLabel: string = 'Terms and Conditions';

  constructor(private vouchersService: IVoucherService, private datePipe: DatePipe) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId) {
      this.voucher$ = this.vouchersService.get(this.voucherId);
    }
  }

  public onClick(): void {
    this.redeem.emit(this.voucherId);
  }

  public ngOnInit(): void {
    if (!this.redeemLabelFn) {
      this.redeemLabelFn = () => 'REDEEM NOW';
    }

    if (!this.expiryFn) {
      this.expiryFn = (v: IVoucher) => `Expires on ${this.datePipe.transform(v.expiry, 'shortDate')}`;
    }
  }
}