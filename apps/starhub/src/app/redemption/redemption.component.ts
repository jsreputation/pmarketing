import { Component, OnInit } from '@angular/core';
import { Voucher, VouchersService } from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent implements OnInit {
  public voucher: Voucher;
  constructor(private vouchersService: VouchersService, private activeRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id))
      )
      .subscribe((voucher: Voucher) => this.voucher = voucher);
  }
}
