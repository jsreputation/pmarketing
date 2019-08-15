import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Voucher, VouchersService, VoucherComponent, VoucherState } from '@perx/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { voucher } from 'src/assets/mock/vouchers';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  filtered: Observable<Voucher[]>
  @ViewChild('voucher', { static: false }) vouch: VoucherComponent;
  filter = "issued";
  constructor(
    private vouchersService: VouchersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeChanged = this.routeChanged.bind(this);
  }

  ngOnInit() {
    this.filtered = this.route.params.pipe(
      switchMap(this.routeChanged)).pipe(
        map(
          (res) => {
            if (!res.length) {
              return this.filter ? voucher.filter((el) => el.state === this.filter) : voucher
            }
            return res && res.length ? res : voucher
          }
        ), catchError(() => of(voucher)));
  }

  routeChanged(param) {
    this.filter = param.id === 'history' ? VoucherState.redeemed : VoucherState.issued;
    return this.vouchersService.getAll()
  }

  routeNavigate(route) {
    this.router.navigate([`voucher/${route}`]);
  }
}
