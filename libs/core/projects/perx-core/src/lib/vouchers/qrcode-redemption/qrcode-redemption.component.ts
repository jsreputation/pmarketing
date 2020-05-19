import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { IVoucher } from '../models/voucher.model';
import { Observable } from 'rxjs';
import { IVoucherService } from '../ivoucher.service';

@Component({
  selector: 'perx-core-qrcode-redemption',
  templateUrl: './qrcode-redemption.component.html',
  styleUrls: ['./qrcode-redemption.component.scss']
})
export class QrcodeRedemptionComponent implements OnChanges {

  @Input()
  public voucherId: number;

  @Input('voucher')
  public voucher$: Observable<IVoucher>;

  constructor(private vouchersService: IVoucherService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId) {
      this.voucher$ = this.vouchersService.get(this.voucherId);
    }
  }
}
