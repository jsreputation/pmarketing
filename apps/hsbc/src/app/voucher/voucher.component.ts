import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  firstTime = false;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.firstTime = this.route.snapshot.paramMap.get('win') === 'true';
  }
}
