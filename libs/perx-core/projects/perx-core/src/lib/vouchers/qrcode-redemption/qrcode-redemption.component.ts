import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { IVoucher } from '../models/voucher.model';
import { Observable } from 'rxjs';
import { VouchersService } from '../vouchers.service';

@Component({
  selector: 'perx-core-qrcode-redemption',
  templateUrl: './qrcode-redemption.component.html',
  styleUrls: ['./qrcode-redemption.component.css']
})

export class QrcodeRedemptionComponent implements OnChanges {

  @Input()
  voucherId: number;

  voucher$: Observable<IVoucher>;

  constructor(private vouchersService: VouchersService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId) {
      this.voucher$ = this.vouchersService.get(this.voucherId);
    }
  }
}
