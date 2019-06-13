import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { VouchersService } from './vouchers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-core-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  @Output() route: EventEmitter<number | string> = new EventEmitter<number | string>();

  vouchers$: Observable<{ id: number, state: string, name: string, img: string, description: string, expiresAt: string }[]>;

  constructor(
    private vouchersService: VouchersService
  ) { }

  ngOnInit() {
    this.vouchers$ = this.vouchersService.getAll();
  }

  onClick(voucher: { id: number, state: string, name: string, img: string, description: string, expiresAt: string }) {
    if (voucher.state === 'redeemed') {
      return;
    }

    this.route.emit(voucher.id);
  }
}
