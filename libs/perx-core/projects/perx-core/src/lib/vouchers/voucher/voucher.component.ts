import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VouchersService } from '../vouchers.service';
import { Observable } from 'rxjs';
import { IVoucher } from '../models/voucher.model';

@Component({
  selector: 'perx-core-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  @Output() redeem: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  hideMerchantImg = false;

  @Input()
  hideMerchantName = false;

  @Input()
  hideExpiry = false;

  @Input()
  hideActions = false;

  voucher$: Observable<IVoucher>;
  voucherId: string;

  constructor(
    private route: ActivatedRoute,
    private vouchersService: VouchersService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.voucher$ = this.vouchersService.get(params[`id`]);
      this.voucherId = params[`id`];
    });
  }

  onClick() {
    this.redeem.emit(this.voucherId);
  }
}
