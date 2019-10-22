import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Voucher, IVoucherService, VoucherComponent, VoucherState, StatusLabelMapping } from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public vouchers: Observable<Voucher[]>;
  public paramId: string;
  @ViewChild('voucher', { static: false }) public vouch: VoucherComponent;
  public filter: string[];
  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };
  constructor(
    private vouchersService: IVoucherService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.paramId = param.id;
      this.filter = this.paramId === 'history' ? [VoucherState.redeemed, VoucherState.expired] :
        [VoucherState.issued, VoucherState.reserved, VoucherState.released];
      this.vouchers = this.vouchersService.getAll({ type: 'all', sourceType: 'hsbc-rewards' });
    });
  }

  public routeNavigate(route: string): void {
    this.router.navigate([`voucher/${route}`]);
  }
}
