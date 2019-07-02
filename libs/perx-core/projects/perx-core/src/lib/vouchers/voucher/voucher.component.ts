import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { VouchersService } from '../vouchers.service';
import { Observable } from 'rxjs';
import { IVoucher } from '../models/voucher.model';

@Component({
  selector: 'perx-core-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnChanges {
  @Output() redeem: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  hideMerchantImg = false;

  @Input()
  hideMerchantName = false;

  @Input()
  hideExpiry = false;

  @Input()
  hideActions = false;

  @Input()
  voucherId: number;

  voucher$: Observable<IVoucher>;

  constructor(private vouchersService: VouchersService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.voucherId) {
      this.voucher$ = this.vouchersService.get(this.voucherId);
    }
  }

  onClick() {
    this.redeem.emit(this.voucherId);
  }
}
