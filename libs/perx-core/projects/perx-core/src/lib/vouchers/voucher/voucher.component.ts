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

  public voucher$: Observable<IVoucher>;

  constructor(private vouchersService: VouchersService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId) {
      this.voucher$ = this.vouchersService.get(this.voucherId);
    }
  }

  public onClick(): void {
    this.redeem.emit(this.voucherId);
  }
}
