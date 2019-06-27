import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucher } from '../models/voucher.model';
import { VouchersService } from '../vouchers.service';

@Component({
  selector: 'perx-core-bcode-redemption',
  templateUrl: './bcode-redemption.component.html',
  styleUrls: ['./bcode-redemption.component.css']
})
export class BcodeRedemptionComponent implements OnChanges {
  @Input()
  voucherId: number = null;

  bCode = ``;

  voucher$: Observable<IVoucher>;

  constructor(
    private vouchersService: VouchersService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId) {
      this.voucher$ = this.vouchersService.get(this.voucherId);
    }
  }
}
