import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';

import { IVoucher } from '../models/voucher.model';
import { IVoucherService } from '../ivoucher.service';

@Component({
  selector: 'perx-core-barcode-redemption',
  templateUrl: './barcode-redemption.component.html',
  styleUrls: ['./barcode-redemption.component.scss']
})
export class BarcodeRedemptionComponent implements OnChanges {

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
