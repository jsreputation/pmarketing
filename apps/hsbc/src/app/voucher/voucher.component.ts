import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  @Input() firstTime = false;

  constructor() { }

  ngOnInit() {
  }

}
