import { Component, OnInit } from '@angular/core';
import { Voucher, ILocation, IVoucherService } from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MacaronService } from '../services/macaron.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  public voucher$: Observable<Voucher>;
  public locations: ILocation[];
  public isButtonEnabled: boolean = true;

  constructor(
    private vouchersService: IVoucherService,
    private activeRoute: ActivatedRoute,
    private macaronService: MacaronService,
    private location: Location) {
  }

  public ngOnInit(): void {
    this.voucher$ = this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id)),
        tap((voucher: Voucher) => {
          const macaron = this.macaronService.getMacaron(voucher.reward);
          if (macaron === null) {
            this.isButtonEnabled = true;
          } else {
            this.isButtonEnabled = macaron.isButtonEnabled;
          }
        })
      );
  }

  public setButton(isEnable: boolean): void {
    this.isButtonEnabled = isEnable;
  }

  public back(): void {
    this.location.back();
  }
}
