import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { IVoucherService } from '../ivoucher.service';
import { Observable } from 'rxjs';
import { IVoucher, StatusLabelMapping } from '../models/voucher.model';

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
  public expiryFn: () => string;

  constructor(private vouchersService: IVoucherService) {
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
      this.expiryFn = () => 'dd/MM/yyyy';
    }
  }
}
