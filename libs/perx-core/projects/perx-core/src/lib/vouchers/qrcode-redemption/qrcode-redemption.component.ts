import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'perx-core-qrcode-redemption',
  templateUrl: './qrcode-redemption.component.html',
  styleUrls: ['./qrcode-redemption.component.css']
})
export class QrcodeRedemptionComponent implements OnInit {

  @Input()
  voucherId: string;

  voucherName  = '$3 voucher';

  constructor() { }

  ngOnInit() {
  }

}
