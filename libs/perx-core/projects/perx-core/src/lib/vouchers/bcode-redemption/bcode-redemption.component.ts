import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucher } from '../models/voucher.model';
import { IVoucherService } from '../ivoucher.service';

@Component({
  selector: 'perx-core-bcode-redemption',
  templateUrl: './bcode-redemption.component.html',
  styleUrls: ['./bcode-redemption.component.css']
})
export class BcodeRedemptionComponent implements OnChanges {
  @Input()
  public voucherId: number = null;

  public bCode: string = ``;

  @Input('voucher')
  public voucher$: Observable<IVoucher>;

  constructor(
    private vouchersService: IVoucherService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId) {
      this.voucher$ = this.vouchersService.get(this.voucherId);
    }
  }
}
