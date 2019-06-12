import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'perx-core-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  @Output() redeem: EventEmitter<VoucherComponent> = new EventEmitter<VoucherComponent>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.redeem.emit(this);
  }
}
