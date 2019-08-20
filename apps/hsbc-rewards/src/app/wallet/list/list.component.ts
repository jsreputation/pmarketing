import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Voucher, VouchersService, VoucherComponent, VoucherState, StatusLabelMapping } from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public vouchers: Observable<Voucher[]>;
  @ViewChild('voucher', { static: false }) public vouch: VoucherComponent;
  public filter: string;
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
  }

  public ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.filter = param.id === 'history' ? VoucherState.redeemed : VoucherState.issued;
    });
    this.vouchers = this.vouchersService.getAll().pipe(map((val) => val));
  }

  public routeNavigate(route: string): void {
    this.router.navigate([`voucher/${route}`]);
  }
}
