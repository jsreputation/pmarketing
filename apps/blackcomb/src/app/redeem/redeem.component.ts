import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Voucher, VouchersService, RedemptionType } from '@perx/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {
  public voucher: Observable<Voucher>;
  public redemptionType: RedemptionType;

  constructor(private route: ActivatedRoute, private vouchersService: VouchersService) { }

  public ngOnInit(): void {
    this.voucher = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          const idN: number = Number.parseInt(id, 10);
          return this.vouchersService.get(idN);
        })
      );
    this.voucher.subscribe((voucher: Voucher) => {
      console.log(voucher);
      this.redemptionType = voucher.redemptionType;
    });
  }
}
