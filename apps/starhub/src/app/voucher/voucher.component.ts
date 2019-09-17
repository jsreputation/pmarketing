import { Component, OnInit } from '@angular/core';
import { Voucher, ILocation, IVoucherService } from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  public voucher: Voucher;
  public locations: ILocation[];
  public isButtonEnable: boolean = false;

  constructor(private vouchersService: IVoucherService, private activeRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id))
      )
      .subscribe((voucher: Voucher) => {
        this.voucher = voucher;
        // this.analytics.addEvent({
          
        // });
      });
  }

  public setButton(isEnable: boolean): void {
    this.isButtonEnable = isEnable;
  }
}
