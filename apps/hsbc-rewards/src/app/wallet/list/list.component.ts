import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Voucher, VouchersService, VoucherComponent, VoucherState, StatusLabelMapping} from '@perx/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { voucher } from 'src/assets/mock/vouchers';
import { ActivatedRoute, Router } from '@angular/router';
import { IVoucher } from '@perx/core/dist/perx-core/lib/vouchers/models/voucher.model';
import { IParam } from 'src/app/shared/interfaces/i-param';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public filtered: Observable<Voucher[]>;
  @ViewChild('voucher', { static: false }) public vouch: VoucherComponent;
  public filter: string = 'issued';
  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };
  constructor(
    private vouchersService: VouchersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeChanged = this.routeChanged.bind(this);
  }

  public ngOnInit(): void {
    this.filtered = this.route.params.pipe(
      switchMap(this.routeChanged)).pipe(
        map(
          (res) => {
            if (!res.length) {
              return this.filter ? voucher.filter((el) => el.state === this.filter) : voucher;
            }
            return res && res.length ? res : voucher;
          }
        ), catchError(() => of(voucher)));
  }

  public routeChanged(param: IParam): Observable<IVoucher[]> {
    this.filter = param.id === 'history' ? VoucherState.redeemed : VoucherState.issued;
    return this.vouchersService.getAll();
  }

  public routeNavigate(route: string): void {
    this.router.navigate([`voucher/${route}`]);
  }
}
