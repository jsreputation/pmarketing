import { Component, OnInit } from '@angular/core';
import { VouchersService } from '@perx/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent implements OnInit {
  voucherDetail;
  constructor(
    private voucherServe: VouchersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((param)=>{
      console.log(param);
      return this.voucherServe.get(param.id);
    })).subscribe((val)=>{
      console.log(val);
    })
  }

}
