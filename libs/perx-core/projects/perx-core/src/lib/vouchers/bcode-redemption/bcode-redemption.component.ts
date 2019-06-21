import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucher } from '../models/voucher.model';
import { ActivatedRoute } from '@angular/router';
import { VouchersService } from '../vouchers.service';

@Component({
  selector: 'perx-core-bcode-redemption',
  templateUrl: './bcode-redemption.component.html',
  styleUrls: ['./bcode-redemption.component.css']
})
export class BcodeRedemptionComponent implements OnInit {

  bCode = `=TYHGV=WPLKN==XCNET=9Y32<==5YUFK=4UWKX=`;

  voucher$: Observable<IVoucher>;

  constructor(
    private route: ActivatedRoute,
    private vouchersService: VouchersService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.voucher$ = this.vouchersService.get(params[`id`]);
    });
  }

}
