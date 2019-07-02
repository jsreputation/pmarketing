import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { VouchersService } from './vouchers.service';
import { Observable } from 'rxjs';
import { IVoucher } from './models/voucher.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'perx-core-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  @Input() filter: string;
  @Input() imageSize: string;
  @Input() iconDisplay: string;
  @Input() showTitle = true;
  @Input() showMerchant = true;
  @Input() showExpireDate = true;
  @Input() showRedeemedDate = false;
  @Input() showRedeemedIcon = true;

  @Output() route: EventEmitter<number | string> = new EventEmitter<number | string>();

  vouchers$: Observable<IVoucher[]>;

  constructor(private vouchersService: VouchersService) { }

  ngOnInit() {
    this.vouchers$ = this.vouchersService.getAll().pipe(
      map(vouchers => {
        return vouchers.filter(v => v.state === this.filter);
      })
    );
  }

  onClick(voucher: { id: number, state: string, name: string, img: string, description: string, expiresAt: string }) {
    if (voucher.state === 'redeemed') {
      return;
    }
    this.route.emit(voucher.id);
  }
}
