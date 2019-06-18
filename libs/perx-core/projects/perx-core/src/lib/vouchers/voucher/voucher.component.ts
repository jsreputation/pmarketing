import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'perx-core-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  @Output() redeem: EventEmitter<VoucherComponent> = new EventEmitter<VoucherComponent>();

  @Input()
  hideMerchantImg = false;

  @Input()
  hideMerchantName = false;

  @Input()
  hideActions = false;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.redeem.emit(this);
  }
}
