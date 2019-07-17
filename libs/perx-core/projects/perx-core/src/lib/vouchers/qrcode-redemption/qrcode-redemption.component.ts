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
  public voucherId: number;

  public voucher$: Observable<IVoucher>;

  constructor(private vouchersService: VouchersService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId) {
      this.voucher$ = this.vouchersService.get(this.voucherId);
    }
  }
}
